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
                    const onClickCard = () => { selectCharacter({ character: character })}
                    return  <CharacterCard
                        key={character.id}
                        character={character}
                        onClick={onClickCard}
                    />
                }
                    
                   
                )}
            </div>
	);
}

export default CharactersLayout;
