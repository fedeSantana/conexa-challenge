import { Character } from "@/services/getCharacters";
import Image from "next/image";
import { experimental_useFormStatus } from "react-dom";

function CharacterCard({
  character,
  condensed,
  cancelAction,
  action,
  disabled,
}: {
  character: Character;
  condensed?: boolean;
  disabled?: boolean;
  cancelAction?: () => void;
  action?: () => void;
}) {
  if (condensed) {
    return (
      <div
        className="flex mb-2 max-h-[154px] min-w-[256px] animate-fade "
        data-testid={character.name}
      >
        <div className="flex bg-white rounded-l-lg shadow-md p-2 w-[256px] truncate">
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
    <form action={action}>
      <button
        disabled={disabled}
        data-testid={character.name}
        type="submit"
        className={`bg-white rounded-lg shadow-md p-2 md:p-4 w-[124px] md:w-[142px] animate-fade disabled:opacity-25`}
      >
        <Image
          className="rounded w-[124px] h-[124px] md:w-[110px] md:h-[110px]"
          src={character.image}
          alt={""}
          width="156"
          height="156"
        />
        <h2 className="text-gray-800 text-m font-semibold mt-2 truncate">
          {character.name}
        </h2>
        <p className="text-gray-600 text-xs truncate">
          {character.gender} - {character.status}
        </p>
      </button>
    </form>
  );
}

export default CharacterCard;
