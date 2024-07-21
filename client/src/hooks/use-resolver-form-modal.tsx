import { create } from "zustand";

interface useResolverFormModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useResolverFormModal = create<useResolverFormModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
