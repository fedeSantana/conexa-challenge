"use server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Character } from "./getCharacters";
import { cookies } from "next/headers";

/**
 * Selects a character by storing its URL in a cookie.
 *
 * This function allows you to select a character by storing the URL of the character
 * in a cookie. This is used for tracking the user's selected characters.
 *
 * @param {Object} options - The options for selecting a character.
 * @param {Character} options.character - The character to be selected.
 */
export async function selectCharacter({ character }: { character: Character }) {
  const cookieStore = cookies();
  const hasCharacterAChoosen = cookieStore.has("character0") ? 1 : 0;
  const hasCharacterBChoosen = cookieStore.has("character1") ? 1 : 0;

  console.log("set cookie", {
    name: `character${hasCharacterAChoosen + hasCharacterBChoosen}`,
    value: character.url,
  });

  cookieStore.set({
    name: `character${hasCharacterAChoosen + hasCharacterBChoosen}`,
    value: character.url,
  });
}

/**
 * Removes a selected character by its index.
 *
 * @param {Object} options - The options for removing a character.
 * @param {number} options.number - The index of the character to be removed.
 * @returns {Promise<void>} A promise that resolves when the character is successfully removed.
 */
export async function removeSelectedCharacter({ number }: { number: number }) {
  const cookieStore = cookies();
  return await cookieStore.delete(`character${number}`);
}

/**
 * Retrieves and returns selected characters metadata from stored URLs.
 *
 * @returns {Promise<Character[]>} A promise that resolves to an array of selected characters
 */
export async function getSelectedCharacters() {
  const cookieStore = cookies();
  const cookieA = cookieStore.get("character0");
  const cookieB = cookieStore.get("character1");

  const cookiesCharacters = [cookieA, cookieB].filter(
    (cookie) => cookie != undefined && cookie.value != "",
  ) as RequestCookie[];

  if (cookiesCharacters.length === 0) {
    return [];
  }

  const charactersResponse = await Promise.all(
    cookiesCharacters.map((cookie) => {
      return fetch(cookie.value);
    }),
  );

  return await Promise.all(
    charactersResponse.map((response) => {
      return response.json() as Promise<Character>;
    }),
  );
}
