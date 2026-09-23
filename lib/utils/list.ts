export function keyExtractorById<T extends { id: number | string }>(item: T): string {
  return String(item.id);
}

export function range(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index);
}
