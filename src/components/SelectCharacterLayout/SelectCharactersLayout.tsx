import {
  getSelectedCharacters,
  removeSelectedCharacter,
  selectCharacter,
} from "@/services/characterSelector";
import getCharacters, { Character } from "@/services/getCharacters";
import CharacterCard from "./components/CharacterCard";
import Link from "next/link";
import PaginationBar from "./components/PaginationBar";
import { getIntersectionOfEpisodes } from "@/app/commonChapters/page";

function CommonButton({
  selectedCharacters,
}: {
  selectedCharacters: Character[];
}) {
  const intersectionEpisodes = getIntersectionOfEpisodes(selectedCharacters);

  if (
    selectedCharacters.length === 2 &&
    intersectionEpisodes &&
    intersectionEpisodes.length > 0
  ) {
    return (
      <Link
        href="commonChapters"
        data-testId={"Ver capítulos en común"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full flex"
      >
        Ver capítulos en común
      </Link>
    );
  }

  if (
    selectedCharacters.length === 2 &&
    intersectionEpisodes &&
    intersectionEpisodes.length === 0
  ) {
    return (
      <p className="white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full flex">
        No hay capítulos en común
      </p>
    );
  }

  if (selectedCharacters.length === 1) {
    return (
      <Link
        href="commonChapters"
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full flex"
      >
        Ver capítulos
      </Link>
    );
  }

  return (
    <p className="white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 w-full flex">
      Todavía no seleccionó un personaje
    </p>
  );
}

export default async function SelectCharacterLayout({
  page,
  loading,
}: {
  page: number;
  loading?: boolean;
}) {
  const charactersData = await getCharacters(page);
  const selectedCharacters = await getSelectedCharacters();

  return (
    <main className="flex max-h-screen flex-col items-center justify-between md:mt-4">
      <h1 className=" flex p-2 text-4xl font-bold text-grey-800 pb-4 md:pb-12 items-center justify-center">
        Intersección de personajes
      </h1>
      <p className="mb-4 font-semibold text-lg px-2">
        {" "}
        Selecciona dos personajes para ver en qué capítulos coinciden
      </p>
      <div className="flex w-screen flex-col-reverse md:flex-row px-2">
        <div className="ml-4 mr-4 max-w-xs">
          <p className="mb-2 text-xl font-semibold">
            {" "}
            Personajes seleccionados{" "}
          </p>
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
          <CommonButton selectedCharacters={selectedCharacters} />
        </div>
        <div className="flex gap-4 w-screen md:flex-wrap overflow-x-auto pb-2 ">
          {charactersData.results.map((character) => {
            const characterIsSelected = selectedCharacters.some(
              (selectedCharacter) => selectedCharacter.id === character.id,
            );

            const characterHasNotChaptersInCommon =
              selectedCharacters.length === 1 &&
              getIntersectionOfEpisodes([selectedCharacters[0], character])
                ?.length === 0;

            return (
              <CharacterCard
                key={character.id}
                character={character}
                disabled={
                  selectedCharacters.length >= 2 ||
                  characterIsSelected ||
                  characterHasNotChaptersInCommon
                }
                action={async () => {
                  "use server";
                  if (selectedCharacters.length < 2) {
                    await selectCharacter({ character });
                  }
                }}
              />
            );
          })}
        </div>
      </div>
      <PaginationBar page={page} />
    </main>
  );
}
