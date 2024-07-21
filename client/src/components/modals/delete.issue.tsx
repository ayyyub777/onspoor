import { useDeleteIssueModal } from "src/hooks/use-delete-issue-modal";
import { deleteIssue } from "src/actions/issues";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function DeleteIssue() {
    const deleteIssueModal = useDeleteIssueModal();
    let params = new URLSearchParams(window.location.search);

    if (!deleteIssueModal.isOpen) {
        history.pushState(null, "", window.location.pathname);
    }

    const handleDelete = async () => {
        let id = params.get("id");
        try {
            if (id) {
                await deleteIssue(id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            history.pushState(null, "", window.location.pathname);
            deleteIssueModal.onClose();
        }
    };

    return (
        <Dialog
            open={deleteIssueModal.isOpen}
            onOpenChange={deleteIssueModal.onClose}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Issue</DialogTitle>
                </DialogHeader>
                <div>
                    <p>
                        Are you sure you want to delete{" "}
                        <span className="font-medium">
                            {params.get("title")}
                        </span>
                        ?
                    </p>
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="text-foreground"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
