import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResolverFormModal } from "src/hooks/use-resolver-form-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRefresh } from "src/context/refresh";
import { postResolver, putResolver } from "src/actions/resolvers";
import { z } from "zod";
import { InputError } from "../ui/input-error";
import { resolverSchema } from "src/schemas/resolver";

type ResolverFormValues = z.infer<typeof resolverSchema>;

export function ResolverForm() {
    const { triggerRefresh } = useRefresh();
    const addResolverModal = useResolverFormModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ResolverFormValues>({
        resolver: zodResolver(resolverSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (id) {
            const defaultValues: ResolverFormValues = {
                name: params.get("name") || "",
                email: params.get("email") || "",
            };
            reset(defaultValues);
        } else {
            reset({ name: "", email: "" });
        }
    }, [reset, addResolverModal.isOpen]);

    useEffect(() => {
        if (!addResolverModal.isOpen) {
            // eslint-disable-next-line no-restricted-globals
            history.pushState(null, "", window.location.pathname);
        }
    }, [addResolverModal.isOpen]);

    const onSubmit = async (data: ResolverFormValues) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id) {
                await putResolver({ id, values: data });
            } else {
                await postResolver(data);
            }
            triggerRefresh();
            reset();
            addResolverModal.onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            // eslint-disable-next-line no-restricted-globals
            history.pushState(null, "", window.location.pathname);
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={addResolverModal.isOpen}
            onOpenChange={addResolverModal.onClose}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {new URLSearchParams(window.location.search).get("id")
                            ? "Edit Resolver"
                            : "Add Resolver"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    className="grid items-start gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Resolver name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <InputError message={errors.name.message} />
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Resolver email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <InputError message={errors.email.message} />
                        )}
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {new URLSearchParams(window.location.search).get("id")
                            ? "Save changes"
                            : "Create resolver"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
