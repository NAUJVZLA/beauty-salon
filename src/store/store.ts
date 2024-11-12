import { create } from 'zustand';

interface AppState {
    itemType: 'service' | 'client';
    setItemType: (type: 'service' | 'client') => void;
    setItemTypeByPath: (path: string) => void;
}

export const useStore = create<AppState>((set) => ({
    itemType: 'service',
    setItemType: (type) => set({ itemType: type }),
    setItemTypeByPath: (path) => {
        const type = path.includes('/client') ? 'client' : 'service';
        set({ itemType: type });
    },
}));
