import CharacterCard from "@/components/CharacterCard";
import { getSelectedCharacters } from "@/services/characterSelector";
import { Character } from "@/services/getCharacters";
import Link from "next/link";

/**
 * Get the intersection of two arrays.
 *
 * @param {string[]} array1 - The first array of episodes.
 * @param {string[]} array2 - The second array of episodes.
 * @returns {string[]} - A new array containing the intersection of episodes.
 */
function getIntersectionOfEpisodes(
	selectedCharacters: Character[]
): string[] | null {
	if (selectedCharacters.length < 2) {
		return null;
	}

	// Use the filter() method to find elements that appear in both arrays.
	const intersection = selectedCharacters[0].episode.filter((episode) =>
		selectedCharacters[1].episode.includes(episode)
	);
	return intersection;
}

export default async function CharactersComparison() {
	const selectedCharacters = await getSelectedCharacters();

	const episodesInCommon = getIntersectionOfEpisodes(selectedCharacters);

	if (selectedCharacters.length < 1) {
		return (
			<div className="flex flex-col">
				<div className="flex w-full place-content-between h-124 pb-12 pt-8 pl-4">
					<Link
						className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 w-[126px] flex items-center justify-center"
						href="/"
					>
						Volver
					</Link>
					<h1 className="flex text-4xl font-bold text-grey-800 items-center justify-center">
						{" "}
						Ver episodios compartidos{" "}
					</h1>
					<div> luna 1 </div>
				</div>
				<h2> Tenes que seleccionar al menos dos personajes </h2>
			</div>
		);
	}

	if (selectedCharacters.length < 2) {
		return (
			<div className="flex flex-col">
				<div className="flex w-full place-content-between h-124 pb-12 pt-8 pl-4">
					<Link
						className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 w-[126px] flex items-center justify-center"
						href="/"
					>
						Volver
					</Link>
					<h1 className="flex text-4xl font-bold text-grey-800 items-center justify-center">
						{" "}
						Ver episodios compartidos{" "}
					</h1>
					<div> luna 1 </div>
				</div>
				<div className="flex place-content-between ml-4 mr-4">
					<div>
						<CharacterCard character={selectedCharacters[0]} />
						{selectedCharacters[0].episode.map((episode) => {
							return <pre key={episode}> {episode} </pre>;
						})}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<div className="flex w-full place-content-between h-124 pb-12 pt-8 pl-4">
				<Link
					className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 w-[126px] flex items-center justify-center"
					href="/"
				>
					Volver
				</Link>
				<h1 className="flex text-4xl font-bold text-grey-800 items-center justify-center">
					{" "}
					Ver episodios compartidos{" "}
				</h1>
				<div> luna 1 </div>
			</div>
			<div className="flex place-content-between ml-4 mr-4">
				<div>
					<CharacterCard character={selectedCharacters[0]} />
					{selectedCharacters[0].episode.map((episode) => {
						return <pre key={episode}> {episode} </pre>;
					})}
				</div>
				<div className="flex flex-col">
					{episodesInCommon?.map((episode) => {
						return (
							<div key={episode}>
								<pre>{episode}</pre>
							</div>
						);
					})}
				</div>
				<div>
					<CharacterCard character={selectedCharacters[1]} />
					{selectedCharacters[1].episode.map((episode) => {
						return <pre key={episode}> {episode} </pre>;
					})}
				</div>
			</div>
			<div></div>
		</div>
	);
}
