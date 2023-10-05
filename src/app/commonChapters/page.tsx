import CharacterCard from "@/components/SelectCharacterLayout/components/CharacterCard";
import { getSelectedCharacters } from "@/services/characterSelector";
import { Character } from "@/services/getCharacters";
import Link from "next/link";

/**
 * Get the intersection of two arrays.
 *
 * @param {string[]} selectedCharacters - An array with only two characters
 * @returns {string[]} - A new array containing the intersection of episodes, if the input array
 * has a different value than two, the intersection gives null.
 */
export function getIntersectionOfEpisodes(
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

export function ShortEpisodeName(url: string) {
	return url.replace("https://rickandmortyapi.com/api/episode/", "");
}

function EpisodeList({ episodes }: { episodes: string[] }) {
	return (
		<ul className="max-h-[10%]  overflow-x-auto max-w-full flex md:block md:overflow-y-auto ">
			{episodes.map((episode) => {
				return (
					<li className="text-xl font-bold mb-2 px-2 md:p-0 " key={episode}>
						{" "}
						{ShortEpisodeName(episode)}{" "}
					</li>
				);
			})}
		</ul>
	);
}

function CharacterAndEpisodes({ character }: { character: Character }) {
	return (
		<div className="p-4">
			<CharacterCard character={character} />
			<p className="text-xl font-semibold mb-2 mt-1 md:mt-2"> Episodios </p>
			<EpisodeList episodes={character.episode} />
		</div>
	);
}

function Header() {
	return (
		<div className="flex w-full pb-1 pl-2 m-auto md:h-124 md:pb-12 pt-4 ">
			<Link
				className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 w-[126px] flex items-center justify-center"
				href="/"
			>
				Volver
			</Link>
			<h1 className="flex pl-2 text-xl font-semibold md:text-4xl md:font-bold text-grey-800 items-center justify-center">
				{" "}
				Ver episodios compartidos{" "}
			</h1>
		</div>
	);
}

export default async function CharactersComparison() {
	const selectedCharacters = await getSelectedCharacters();

	const episodesInCommon = getIntersectionOfEpisodes(selectedCharacters);

	if (selectedCharacters.length < 1) {
		return (
			<div className="flex flex-col">
				<Header />
				<h2> Tenes que seleccionar al menos dos personajes </h2>
			</div>
		);
	}

	if (selectedCharacters.length < 2) {
		return (
			<div className="flex flex-col">
				<Header />
				<div className="flex place-content-between m-auto">
					<CharacterAndEpisodes character={selectedCharacters[0]} />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex flex-col md:flex-row place-content-between m-auto w-full">
				<CharacterAndEpisodes character={selectedCharacters[0]} />
				<div className="flex flex-col p-2 md:order-[0] order-[-1]">
					<p className="text-xl font-semibold mb-2 md:pt-[198px]"> Episodios compartidos </p>
					{episodesInCommon && (
						<EpisodeList episodes={episodesInCommon} />
					)}
				</div>
				<CharacterAndEpisodes character={selectedCharacters[1]} />
			</div>
		</div>
	);
}
