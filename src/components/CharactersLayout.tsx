"use server";
import { Character } from "@/services/getCharacters";
import CharacterCard from "./CharacterCard";
import { selectCharacter } from "@/services/characterSelector";

function CharactersLayout({
  characters,
}: {
  characters: Character[];
  page: number;
}) {
  return (
    <div className="flex gap-4 w-screen flex-wrap">
      {characters.map((character) => {
        const clickAction = async () => {
          "use server";
          selectCharacter({ character });
        };
        return (
          <CharacterCard
            key={character.id}
            character={character}
            cancelAction={() => {
              "use server";
              clickAction();
            }}
          />
        );
      })}
    </div>
  );
}

export default CharactersLayout;
