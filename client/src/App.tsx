import { Container } from "@mui/material";
import mangaService from "./services/manga";
import { useEffect, useState } from "react";
import { BasicManga } from "./types";
import MangaEntries from "./components/Manga/MangaEntries";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Container style={{ width: "auto" }}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <MangaEntries manga={manga}></MangaEntries>
              )}
            </Container>}></Route>
            <Route path="/awards" element={<>test</>}></Route>
            <Route path="/authors" element={<>test</>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
