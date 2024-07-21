import { create } from "zustand";

interface useDeleteResolverModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useDeleteResolverModal = create<useDeleteResolverModalStore>(
    (set) => ({
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    })
);
