import type { RefObject } from "react";
import type { View } from "react-native";

type ViewShotModule = typeof import("react-native-view-shot");

// Loaded on demand: a dev build without the native module would otherwise crash on import.
async function loadViewShot(): Promise<ViewShotModule | null> {
  try {
    return await import("react-native-view-shot");
  } catch {
    return null;
  }
}

export async function captureThemeSnapshot(viewRef: RefObject<View | null>): Promise<string | null> {
  const viewShot = await loadViewShot();
  if (!viewShot) return null;

  try {
    return await viewShot.captureRef(viewRef, { format: "jpg", quality: 0.9, result: "tmpfile" });
  } catch {
    return null;
  }
}

export async function releaseThemeSnapshot(snapshotUri: string) {
  const viewShot = await loadViewShot();
  viewShot?.releaseCapture(snapshotUri);
}
