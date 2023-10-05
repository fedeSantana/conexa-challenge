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

	const hasCharacterAChoosen = cookieStore.has("character0");
	const hasCharacterBChoosen = cookieStore.has("character1");

	if (hasCharacterAChoosen && hasCharacterBChoosen) {
		throw new Error("It's not possible to select three characters");
	}

	if (!hasCharacterAChoosen) {
		cookieStore.set({ name: "character0", value: character.url });
		return;
	}

	if (!hasCharacterBChoosen) {
		cookieStore.set({ name: "character1", value: character.url });
	}
}

/**
 * Removes a selected character by its index.
 *
 * @param {Object} options - The options for removing a character.
 * @param {number} options.number - The index of the character to be removed.
 * @returns {Promise<void>} A promise that resolves when the character is successfully removed.
 */
export async function removeSelectedCharacter({ index }: { index: number }) {
	const cookieStore = cookies();
	if (index === 0) {
		const character1 = cookieStore.get("character1")?.value;
		if (character1) {
			cookieStore.set({ name: "character0", value: character1 });
			cookieStore.delete("character1");
		} else {
			cookieStore.delete("character0");
		}
	} else {
		cookieStore.delete("character1");
	}
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
		(cookie) => cookie != undefined && cookie.value != ""
	) as RequestCookie[];

	if (cookiesCharacters.length === 0) {
		return [];
	}

	const charactersResponse = await Promise.all(
		cookiesCharacters.map((cookie) => {
			return fetch(cookie.value);
		})
	);

	return await Promise.all(
		charactersResponse.map((response) => {
			return response.json() as Promise<Character>;
		})
	);
}
