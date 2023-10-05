import Link from "next/link";

export default async function CharactersComparison() {
  return (
    <div className="flex w-full place-content-between h-124 pb-12 pt-8 pl-4">
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 w-[126px] flex items-center justify-center"
        href="/"
      >
        Volver
      </Link>
      <h1 className="flex text-4xl font-bold text-grey-800 items-center justify-center">
        {" "}
        Ver episodios compartidos{" "}
      </h1>
      <div> luna 1 </div>
    </div>
  );
}
