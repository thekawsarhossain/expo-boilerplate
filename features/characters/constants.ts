export const CHARACTER_STATUSES = ["Alive", "Dead", "unknown"] as const;

export const CHARACTER_STATUS_LABELS: Record<(typeof CHARACTER_STATUSES)[number], string> = {
  Alive: "Alive",
  Dead: "Dead",
  unknown: "Unknown",
};

export const CHARACTER_STATUS_DOT_CLASSES: Record<(typeof CHARACTER_STATUSES)[number], string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-muted-foreground",
};
