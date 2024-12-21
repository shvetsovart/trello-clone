import { create } from "zustand";

type CardModalStore = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
};

export const useCardModal = create<CardModalStore>((set) => ({ 
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
