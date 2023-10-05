import { getSelectedCharacters, removeSelectedCharacter } from "@/services/characterSelector";
import getCharacters from "@/services/getCharacters";
import CharacterCard from "./CharacterCard";
import Link from "next/link";
import CharactersLayout from "./CharactersLayout";
import PaginationBar from "./PaginationBar";
import { getIntersectionOfEpisodes } from "@/app/commonChapters/page";

export default async function SelectCharacterLayout({page} : { page : number}){
 	const charactersData = await getCharacters(page);

	const selectedCharacters = await getSelectedCharacters();
    const intersectionEpisodes = getIntersectionOfEpisodes(selectedCharacters)

	return (
		<main className="flex max-h-screen flex-col items-center justify-between mt-4">
			<h1 className=" flex text-4xl font-bold text-grey-800 pb-12 items-center justify-center">
				{" "}
				Intersección de personajes{" "}
			</h1>
			<div className="flex w-screen">
				<div className="ml-4 mr-4 max-w-xs">
					<p className="mb-2"> Personajes seleccionados </p>
					{selectedCharacters.map((selectedCharacter, index) => {
						return (
							<>
								<CharacterCard
									key={selectedCharacter.id}
									character={selectedCharacter}
									cancelAction={async () => {
										"use server";
										removeSelectedCharacter({
											index: index,
										});
									}}
									condensed
								/>
							</>
						);
					})}
					{selectedCharacters.length === 2 && intersectionEpisodes && intersectionEpisodes.length > 0 && (
						<Link
							href="commonChapters"
							className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full flex"
						>
							Ver capítulos en común
						</Link>
					)}
                    {selectedCharacters.length === 2 && intersectionEpisodes && intersectionEpisodes.length === 0 && (
						<button
                            aria-disabled={true}
                            disabled={true}
							className="white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full flex"
						>
							No hay episodios en comun
						</button>
					)}
					{selectedCharacters.length === 1 && (
						<Link
							href="commonChapters"
							className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full flex"
						>
							Ver capítulos
						</Link>
					)}
					{selectedCharacters.length === 0 && (
						<p className="white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full flex">
							Todavía no seleccionó un personaje
						</p>
					)}
				</div>
				<CharactersLayout
					characters={charactersData.results}
					selectedCharacters={selectedCharacters}
					page={page}
				/>
			</div>
			<PaginationBar page={page} />
		</main>
	);
}
