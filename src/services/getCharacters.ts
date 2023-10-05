export interface CharactersMetadata {
  info: Info;
  results: Character[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export type Gender = "Male" | "Female" | "unknown";

export interface Location {
  name: string;
  url: string;
}

export type Species = "Human" | "Alien";

export type Status = "Alive" | "unknown" | "Dead";

const baseUrl = "https://rickandmortyapi.com/api";

async function getCharacters(page: number = 1) {
  const response = await fetch(`${baseUrl}/character?page=${page}`);
  const data = (await response.json()) as CharactersMetadata;

  return data;
}

export default getCharacters;
