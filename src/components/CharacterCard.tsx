import { selectCharacter } from "@/services/characterSelector";
import { Character } from "@/services/getCharacters";
import Image from "next/image";

function CharacterCard({
  character,
  condensed,
  cancelAction,
  action,
}: {
  character: Character;
  condensed?: boolean;
  cancelAction?: () => void;
  action?: () => void;
}) {
  if (condensed) {
    return (
      <div className="flex mb-2 max-h-[154px] max-w-[256px]">
        <div className="flex bg-white rounded-l-lg shadow-md p-2 max-w-[256px]">
          <Image
            className="rounded max-w-[64px] max-h-[64px]"
            src={character.image}
            alt={""}
            width="156"
            height="156"
          />
          <div className="flex flex-col justify-start ml-2 w-full">
            <h2 className="text-gray-800 text-xl font-semibold truncate">
              {character.name}
            </h2>
            <p className="text-gray-600 mt-2 truncate">
              {character.gender} - {character.status}
            </p>
          </div>
        </div>
        <form className="flex w-8 max-h-[154px]">
          <button
            className="w-full min-w-[32px] rounded-r-lg bg-rose-400 block h-full"
            aria-label="remover del listado"
            type="submit"
            formAction={cancelAction}
          >
            X
          </button>
        </form>
      </div>
    );
  }

  return (
    <form>
      <button
        type="submit"
        className="bg-white rounded-lg shadow-md p-4 max-w-[156px]"
        formAction={action}
      >
        <Image
          className="rounded w-156 h-156"
          src={character.image}
          alt={""}
          width="156"
          height="156"
        />
        <h2 className="text-gray-800 text-xl font-semibold mt-4 truncate">
          {character.name}
        </h2>
        <p className="text-gray-600 mt-2">
          {character.gender} - {character.status}
        </p>
      </button>
    </form>
  );
}

export default CharacterCard;
