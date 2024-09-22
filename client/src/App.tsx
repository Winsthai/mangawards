import MangaEntries from "./components/Manga/MangaEntries";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AwardEntries from "./components/Award/AwardEntries";
import AuthorEntries from "./components/Authors/AuthorEntries";
import AwardPage from "./components/Award/AwardPage";
import AuthorPage from "./components/Authors/AuthorPage";
import MangaPage from "./components/Manga/MangaPage";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import UserPage from "./components/User/UserPage";
import { useEffect } from "react";
import { AxiosError } from "axios";
import userService from "./services/user";
import { useUserContext } from "./UserContext";

const App = () => {
  const { setUser } = useUserContext();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user.id);
      const fetchUser = async () => {
        try {
          const fetchedUser = await userService.getUser(user.id as string);
          setUser(fetchedUser);
        } catch (error) {
          if (error instanceof AxiosError) {
            setUser(null);
          }
        }
      };
      void fetchUser();
    }
  }, [setUser]);

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
            <Route
              path="/authors/:id"
              element={<AuthorPage></AuthorPage>}
            ></Route>
            <Route path="/manga/:id" element={<MangaPage></MangaPage>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signUp" element={<SignUp></SignUp>}></Route>
            <Route path="/user/:id" element={<UserPage></UserPage>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
