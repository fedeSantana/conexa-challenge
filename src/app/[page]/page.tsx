import CharactersLayout from "@/components/CharactersLayout";
import getCharacters from "@/services/getCharacters";

export default async function Home({ params }: { params: { page: string } }) {
  const charactersMetadata = await getCharacters(params.page);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CharactersLayout
        characters={charactersMetadata.results}
        page={Number.parseInt(params.page)}
      />
    </main>
  );
}
