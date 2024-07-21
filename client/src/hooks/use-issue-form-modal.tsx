import { create } from "zustand";

interface useIssueFormModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useIssueFormModal = create<useIssueFormModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
