export type PaginationInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type PaginatedResponse<T> = {
  info: PaginationInfo;
  results: T[];
};

export type ResourceLink = {
  name: string;
  url: string;
};
