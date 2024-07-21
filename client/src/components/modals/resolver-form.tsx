import { useResolverFormModal } from "src/hooks/use-resolver-form-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRefresh } from "src/context/refresh";
import { postResolver, putResolver } from "src/actions/resolvers";

interface ResolverFormValues {
    name: string;
    email: string;
}

export function ResolverForm() {
    const { triggerRefresh } = useRefresh();
    const addIssueModal = useResolverFormModal();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const defaultValues: ResolverFormValues = {
        name: params.get("name") || "",
        email: params.get("email") || "",
    };

    const [values, setValues] = useState<ResolverFormValues>(defaultValues);
    const [isLoading, setIsLoading] = useState(false);

    if (!addIssueModal.isOpen) {
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, "", window.location.pathname);
    }

    useEffect(() => {
        if (id) {
            setValues(defaultValues);
        }
    }, [id]);

    const handleChange = (field: keyof ResolverFormValues, value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (id) {
                await putResolver({ id, values });
            } else {
                await postResolver(values);
            }
            triggerRefresh();
            setValues(defaultValues);
            addIssueModal.onClose();
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
            open={addIssueModal.isOpen}
            onOpenChange={addIssueModal.onClose}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {id ? "Edit Resolver" : "Add Resolver"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    className="grid items-start gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Resolver name"
                            value={values.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Resolver email"
                            value={values.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {id ? "Save changes" : "Create resolver"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
