import { create } from "zustand";

import { MAX_VISIBLE_TOASTS, TOAST_DURATION_MS } from "@/constants/ui";

export type ToastVariant = "success" | "error" | "info";

export type ToastMessage = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastState = {
  toasts: ToastMessage[];
  showToast: (message: string, variant: ToastVariant) => void;
  dismissToast: (id: number) => void;
};

let nextToastId = 0;

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  showToast: (message, variant) => {
    const id = nextToastId++;
    set(({ toasts }) => ({
      toasts: [...toasts, { id, message, variant }].slice(-MAX_VISIBLE_TOASTS),
    }));
    setTimeout(() => get().dismissToast(id), TOAST_DURATION_MS);
  },
  dismissToast: (id) => set(({ toasts }) => ({ toasts: toasts.filter((toast) => toast.id !== id) })),
}));

export const toast = {
  success: (message: string) => useToastStore.getState().showToast(message, "success"),
  error: (message: string) => useToastStore.getState().showToast(message, "error"),
  info: (message: string) => useToastStore.getState().showToast(message, "info"),
};
