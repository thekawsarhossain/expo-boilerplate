import { create } from "zustand";

type ThemeTransitionState = {
  snapshotUri: string | null;
  applyTheme: (() => void) | null;
  startTransition: (snapshotUri: string, applyTheme: () => void) => void;
  finishTransition: () => void;
};

export const useThemeTransitionStore = create<ThemeTransitionState>()((set) => ({
  snapshotUri: null,
  applyTheme: null,
  startTransition: (snapshotUri, applyTheme) => set({ snapshotUri, applyTheme }),
  finishTransition: () => set({ snapshotUri: null, applyTheme: null }),
}));
