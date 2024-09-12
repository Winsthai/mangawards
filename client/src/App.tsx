import MangaEntries from "./components/Manga/MangaEntries";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AwardEntries from "./components/Award/AwardEntries";
import AuthorEntries from "./components/Authors/AuthorEntries";
import AwardPage from "./components/Award/AwardPage";
import AuthorPage from "./components/Authors/AuthorPage";

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<MangaEntries></MangaEntries>}></Route>
            <Route
              path="/awards"
              element={<AwardEntries></AwardEntries>}
            ></Route>
            <Route
              path="/authors"
              element={<AuthorEntries></AuthorEntries>}
            ></Route>
            <Route path="/awards/:id" element={<AwardPage></AwardPage>}></Route>
            <Route path="/authors/:id" element={<AuthorPage></AuthorPage>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
