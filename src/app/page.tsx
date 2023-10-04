import CharacterCard from "@/components/CharacterCard";
import CharactersLayout from "@/components/CharactersLayout";
import PaginationBar from "@/components/PaginationBar";
import getCharacters from "@/services/getCharacters";

export default async function Home() {
	const charactersData = await getCharacters();

	return (
		<main className="flex max-h-screen flex-col items-center justify-between mt-4">
			<h1 className=" flex text-4xl font-bold text-grey-800 pb-12 items-center justify-center">
				{" "}
				Intersección de personajes{" "}
			</h1>
			<div className="flex w-screen">
				<div className="ml-4 mr-4">
					<p className="mb-2"> Personajes seleccionados </p>
					<CharacterCard
						condensed
						character={charactersData.results[0]}
					/>
          <CharacterCard
						condensed
						character={charactersData.results[1]}
					/>
          <CharacterCard
						condensed
						character={charactersData.results[2]}
					/>
          <CharacterCard
						condensed
						character={charactersData.results[3]}
					/>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full">
            Ver capítulos en común
          </button>
				</div>
				<CharactersLayout
					characters={charactersData.results}
					page={1}
				/>
			</div>
			<PaginationBar page={1} />
		</main>
	);
}
