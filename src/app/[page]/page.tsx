import SelectCharacterLayout from "@/components/SelectCharactersLayout";

export default async function Home({ params }: { params: { page: string } }) {
        return <SelectCharacterLayout page={Number.parseInt(params.page)}/>
}
