import { Character } from "@/services/getCharacters";
import CharacterCard from "./CharacterCard";
import { getSelectedCharacters, selectCharacter } from "@/services/characterSelector";

async function CharactersLayout({
  characters,
}: {
  characters: Character[];
  page: number;
}) {

    const selectedCharacters = await getSelectedCharacters();

  return (
    <div className="flex gap-4 w-screen flex-wrap">
      {characters.map((character) => {
        if (selectedCharacters.some( selectedCharacter => selectedCharacter.id === character.id)){
            return null
        }
        
        return (
          <CharacterCard
            key={character.id}
            character={character}
            action={async () => {
          "use server";
            if (selectedCharacters.length < 2){
            selectCharacter({ character });
            }
            }}
          />
        );
      })}
    </div>
  );
}

export default CharactersLayout;
