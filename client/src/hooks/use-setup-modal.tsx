import { create } from "zustand";

interface useSetupModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSetupModal = create<useSetupModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
