'use server'
/**
 * Module for selecting and managing characters using cookies.
 * @module CharacterSelector
 */

import { Character, CharactersMetadata } from "./getCharacters"
import { cookies } from 'next/headers'

/**
 * Selects a character by storing its URL in a cookie.
 *
 * This function allows you to select a character by storing the URL of the character
 * in a cookie. This is used for tracking the user's selected characters.
 *
 * @param {Object} options - The options for selecting a character.
 * @param {Character} options.character - The character to be selected.
 */
export async function selectCharacter({ character } : { character : Character}){

    const cookieStore = cookies()
    const ammountCharacters = cookieStore.getAll('character').length
    console.log('Oh, sí, seleccione un personaje')
    
    cookieStore.set({
    name: `character${ammountCharacters}`,
    value: character.url,
  })
}

/**
 * Removes a selected character by its index.
 *
 * @param {Object} options - The options for removing a character.
 * @param {number} options.number - The index of the character to be removed.
 * @returns {Promise<void>} A promise that resolves when the character is successfully removed.
 */
export async function removeSelectedCharacter({number} : { number : number}){
    const cookieStore = cookies()

    cookieStore.delete(`character${number}`)
}

/**
 * Retrieves and returns selected characters metadata from stored URLs.
 *
 * @returns {Promise<CharactersMetadata[]>} A promise that resolves to an array of selected characters
 */
export async function getSelectedCharacters(){
        const cookieStore = cookies()
        const charactersUrls = cookieStore.getAll('character')

        const charactersResponse = await Promise.all(charactersUrls.map((cookie) => {
        	return fetch(cookie.value);
        }))

        return await Promise.all(charactersResponse.map( response => {
             return response.json() as Promise<CharactersMetadata> 
        } ))
}

/**
 * Retrieves and returns the number of selected characters.
 *
 * @returns {Promise<number>} A promise that resolves to the number of selected characters.
 */
export async function getAmmountSelectedCharacters(){
    const cookieStore = cookies()

        return cookieStore.getAll('character').length
}