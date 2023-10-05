"use client";
import {
	experimental_useFormStatus,
	experimental_useFormStatus as useFormStatus,
} from "react-dom";
import { Character } from "@/services/getCharacters";
import CharacterCard from "./CharacterCard";
import {
	selectCharacter,
} from "@/services/characterSelector";

function CharactersLayout({
	characters,
	selectedCharacters,
}: {
	characters: Character[];
	page: number;
	selectedCharacters: Character[];
}) {
	const { pending } = experimental_useFormStatus();
	
    if (pending) {
		return "loading";
	}
	
    return (
		<div className="flex gap-4 w-screen flex-wrap">
			{characters.map((character) => {
				if (
					selectedCharacters.some(
						(selectedCharacter) =>
							selectedCharacter.id === character.id
					)
				) {
					return null;
				}

				return (
					<CharacterCard
						key={character.id}
						character={character}
						action={async () => {
							if (selectedCharacters.length < 2) {
								await selectCharacter({ character });
							}
						}}
					/>
				);
			})}
		</div>
	);
}

export default CharactersLayout;
