import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/constants/storage";
import { zustandStorage } from "@/lib/storage";

type FavoritesState = {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteIds: [],
      toggleFavorite: (id) =>
        set(({ favoriteIds }) => ({
          favoriteIds: favoriteIds.includes(id)
            ? favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...favoriteIds, id],
        })),
    }),
    { name: STORAGE_KEYS.favorites, storage: zustandStorage },
  ),
);

export function useIsFavorite(id: number) {
  return useFavoritesStore((state) => state.favoriteIds.includes(id));
}
