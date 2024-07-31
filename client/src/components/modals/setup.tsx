import { useState } from "react";
import { useSetupModal } from "src/hooks/use-setup-modal";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "src/hooks/use-toast";
import { useRefresh } from "src/context/refresh";
import { populate } from "src/actions/populate";

export function Setup() {
    const { triggerRefresh } = useRefresh();
    const setupModal = useSetupModal();
    const [isLoading, setIsLoading] = useState(false);

    const handlePopulate = async () => {
        setIsLoading(true);
        try {
            const response = await populate();
            toast({ description: response.message });

            triggerRefresh();
            setupModal.onClose();
        } catch (error: any) {
            let errorMessage = "An error occurred. Please try again.";
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            toast({ description: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={setupModal.isOpen} onOpenChange={setupModal.onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Explore Your Data</DialogTitle>
                </DialogHeader>
                <div>
                    <p>
                        If you want to explore as a demo, you can populate with
                        sample data.
                    </p>
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="text-foreground"
                        >
                            Add My Own Data
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handlePopulate}>
                        Load a Sample Dataset
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
