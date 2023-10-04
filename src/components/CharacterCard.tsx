import { Character } from "@/services/getCharacters"
import Image from "next/image"

function CharacterCard( {character, condensed, onClick} : { character : Character, condensed?: boolean, onClick?: () => void}){
    
    if (condensed){
         return <div className="flex bg-white rounded-lg shadow-md p-2 mb-2" onClick={onClick}>
        <Image className="rounded max-w-[64px] max-h-[64px]" src={character.image} alt={''} width='156' height='156'/>
        <div className="flex flex-col justify-start ml-2 ">
            <h2 className="text-gray-800 text-xl font-semibold truncate">{ character.name}</h2>
            <p className="text-gray-600 mt-2">{character.gender} - {character.status}</p>
        </div>
        <button aria-content="Eliminar">
            x
        </button>
      </div>
    }

    return <button className="bg-white rounded-lg shadow-md p-4 max-w-[156px]">
        <Image className="rounded w-156 h-156" src={character.image} alt={''} width='156' height='156'/>
        <h2 className="text-gray-800 text-xl font-semibold mt-4 truncate">{ character.name}</h2>
        <p className="text-gray-600 mt-2">{character.gender} - {character.status}</p>
      </button>
}

export default CharacterCard