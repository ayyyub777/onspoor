import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIssueFormModal } from "src/hooks/use-issue-form-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { postIssue, putIssue } from "src/actions/issues";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { priorities, statuses } from "src/data/data";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useRefresh } from "src/context/refresh";
import { getResolvers } from "src/actions/resolvers";
import { ApiResponse, Resolver } from "src/types";
import { z } from "zod";
import { InputError } from "../ui/input-error";
import { issueSchema } from "src/schemas/issue";

type IssueFormValues = z.infer<typeof issueSchema>;

export function IssueForm() {
    const { triggerRefresh } = useRefresh();
    const addIssueModal = useIssueFormModal();

    const [isLoading, setIsLoading] = useState(false);
    const [resolvers, setResolvers] = useState<Resolver[] | undefined>();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IssueFormValues>({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            title: "",
            status: "backlog",
            priority: "low",
            assignee: "",
        },
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (id) {
            const defaultValues: IssueFormValues = {
                title: params.get("title") || "",
                status: params.get("status") || "backlog",
                priority: params.get("priority") || "low",
                assignee: params.get("assignee") || "",
            };
            reset(defaultValues);
        } else {
            reset({
                title: "",
                status: "backlog",
                priority: "low",
                assignee: "",
            });
        }
    }, [reset, addIssueModal.isOpen]);

    useEffect(() => {
        if (!addIssueModal.isOpen) {
            // eslint-disable-next-line no-restricted-globals
            history.pushState(null, "", window.location.pathname);
        }
    }, [addIssueModal.isOpen]);

    useEffect(() => {
        resolverOptions();
    }, []);

    const resolverOptions = async () => {
        try {
            const response: ApiResponse = await getResolvers();
            setResolvers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data: IssueFormValues) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id) {
                await putIssue({ id, values: data });
            } else {
                await postIssue(data);
            }
            triggerRefresh();
            reset();
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
                        {new URLSearchParams(window.location.search).get("id")
                            ? "Edit Issue"
                            : "Add Issue"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    className="grid items-start gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Describe issue"
                            {...register("title")}
                        />
                        {errors.title && (
                            <InputError message={errors.title.message} />
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem
                                                key={status.value}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.status && (
                            <InputError message={errors.status.message} />
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorities.map((priority) => (
                                            <SelectItem
                                                key={priority.value}
                                                value={priority.value}
                                            >
                                                {priority.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.priority && (
                            <InputError message={errors.priority.message} />
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="assignee">Assignee</Label>
                        {resolvers && resolvers.length > 0 ? (
                            <Controller
                                name="assignee"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select resolver" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {resolvers.map((resolver) => (
                                                <SelectItem
                                                    key={resolver.name}
                                                    value={resolver.name}
                                                >
                                                    {resolver.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        ) : (
                            <Input
                                type="text"
                                id="assignee"
                                placeholder="Assign to resolver"
                                {...register("assignee")}
                            />
                        )}
                        {errors.assignee && (
                            <InputError message={errors.assignee.message} />
                        )}
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {new URLSearchParams(window.location.search).get("id")
                            ? "Save changes"
                            : "Create issue"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
