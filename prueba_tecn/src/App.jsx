import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, Image } from "@nextui-org/react";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        setCharacters(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="bg-zinc-800 flex m-auto">
      <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 ">
        {characters.map((character) => (
          <Card
            key={character.id}
            className="col-span-12 sm:col-span-4 h-[300px]"
          >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-black uppercase font-bold">
                {character.name}
              </p>
              <h4 className="text-black font-medium text-large">
                {character.status}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt={character.name}
              className="z-0 w-full h-full object-cover"
              src={character.image}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}
