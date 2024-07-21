import { create } from "zustand";

interface useDeleteIssueModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useDeleteIssueModal = create<useDeleteIssueModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
