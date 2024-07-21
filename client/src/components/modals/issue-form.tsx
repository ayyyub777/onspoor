import { useIssueFormModal } from "src/hooks/use-issue-form-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { postIssue } from "src/actions/issues";
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
import { putIssue } from "src/actions/issues";
import { useRefresh } from "src/context/refresh";

interface IssueFormValues {
    title: string;
    status: string;
    priority: string;
    assignee: string;
}

export function IssueForm() {
    const { triggerRefresh } = useRefresh();
    const addIssueModal = useIssueFormModal();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const defaultValues: IssueFormValues = {
        title: params.get("title") || "",
        status: params.get("status") || "backlog",
        priority: params.get("priority") || "low",
        assignee: params.get("assignee") || "",
    };

    const [values, setValues] = useState<IssueFormValues>(defaultValues);
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

    const handleChange = (field: keyof IssueFormValues, value: string) => {
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
                await putIssue({ id, values });
            } else {
                await postIssue(values);
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
                    <DialogTitle>{id ? "Edit Issue" : "Add Issue"}</DialogTitle>
                </DialogHeader>
                <form
                    className="grid items-start gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Describe issue"
                            value={values.title}
                            onChange={(e) =>
                                handleChange("title", e.target.value)
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={values.status}
                            onValueChange={(newValue) =>
                                handleChange("status", newValue)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {statuses.find(
                                        (status) =>
                                            status.value === values.status
                                    )?.label || "Select status"}
                                </SelectValue>
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
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={values.priority}
                            onValueChange={(newValue) =>
                                handleChange("priority", newValue)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {priorities.find(
                                        (priority) =>
                                            priority.value === values.priority
                                    )?.label || "Select priority"}
                                </SelectValue>
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
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="assignee">Assignee</Label>
                        <Input
                            type="text"
                            id="assignee"
                            placeholder="Assign to resolver"
                            value={values.assignee}
                            onChange={(e) =>
                                handleChange("assignee", e.target.value)
                            }
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {id ? "Save changes" : "Create issue"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
