import type { ResourceLink } from "@/types/api";
import type { CHARACTER_STATUSES } from "./constants";

export type CharacterStatus = (typeof CHARACTER_STATUSES)[number];

export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: ResourceLink;
  location: ResourceLink;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterFilters = {
  name?: string;
  status?: CharacterStatus;
};
