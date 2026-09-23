export function getIdFromUrl(url: string): number | undefined {
  const id = Number(url.split("/").findLast(Boolean));
  return Number.isInteger(id) ? id : undefined;
}
