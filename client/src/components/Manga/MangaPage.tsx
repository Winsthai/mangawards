import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Manga } from "../../types";
import mangaService from "../../services/manga";
import { Container } from "@mui/material";
import MangaInfo from "./MangaInfo";

const isManga = (object: Manga | { error: string }): boolean => {
  if ("error" in object) {
    return false;
  }
  return true;
};

const MangaPage = () => {
  const { id } = useParams();

  const [manga, setManga] = useState<Manga | null | { error: string }>(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const fetchedManga = await mangaService.getManga(id as string);
        setManga(fetchedManga);
      } catch (error) {
        if (error instanceof AxiosError) {
          setManga(error.response!.data);
        }
      }
      setLoading(false); // Set loading to false once data is fetched
    };
    void fetchManga();
  }, [id]);

  return (
    <Container sx={{ marginTop: "20px" }}>
      {loading ? (
        <div>Loading...</div>
      ) : manga ? (
        <>
          {isManga(manga) ? (
            <MangaInfo manga={manga as Manga}></MangaInfo>
          ) : (
            <>Manga with id {id} does not exist</>
          )}
        </>
      ) : (
        <>Could not retrieve data</>
      )}
    </Container>
  );
};

export default MangaPage;
