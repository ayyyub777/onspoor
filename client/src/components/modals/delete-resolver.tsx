import { useDeleteResolverModal } from "src/hooks/use-delete-resolver-modal";
import { deleteResolver } from "src/actions/resolvers";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRefresh } from "src/context/refresh";

export function DeleteResolver() {
    const { triggerRefresh } = useRefresh();
    const deleteIssueModal = useDeleteResolverModal();
    let params = new URLSearchParams(window.location.search);

    if (!deleteIssueModal.isOpen) {
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, "", window.location.pathname);
    }

    const handleDelete = async () => {
        let id = params.get("id");
        try {
            if (id) {
                await deleteResolver(id);
            }
            triggerRefresh();
        } catch (error) {
            console.error(error);
        } finally {
            // eslint-disable-next-line no-restricted-globals
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
                            {params.get("name")}
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
