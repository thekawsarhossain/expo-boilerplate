export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "https://rickandmortyapi.com/api",
} as const;
