import { Container } from "@mui/material";
import MangaCard from "./components/MangaCard";
import mangaService from "./services/manga";
import { useEffect, useState } from "react";
import { BasicManga } from "./types";

const App = () => {
  const [manga, setManga] = useState<BasicManga[]>([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchManga = async () => {
      const fetchedManga = await mangaService.getAllBasic();
      setManga(fetchedManga);
      setLoading(false); // Set loading to false once data is fetched
    };
    void fetchManga();
  }, []);

  /* useEffect(() => {
    console.log(manga.length);
  }, [loading]); */

  return (
    <>
      <div>
        <Container style={{ width: "auto" }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {manga.slice(0, 50).map((individualManga) => (
                <MangaCard
                  key={individualManga.title}
                  manga={individualManga}
                ></MangaCard>
              ))}
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default App;
