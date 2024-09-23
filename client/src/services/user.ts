import axios from "axios";
import { apiBaseUrl } from "../constants";
import { User } from "../types";

const loggedUserJSON = window.localStorage.getItem("loggedInUser");
let token: string;
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON);
  token = user.token;
}

const getUser = async (id: string): Promise<User> => {
  const { data } = await axios.get(`${apiBaseUrl}/user/${id}`);

  return data;
};

const addMangaToUser = async (id: string, mangaId: string): Promise<User> => {
  const { data } = await axios.post(
    `${apiBaseUrl}/user/${id}`,
    {
      mangaId: mangaId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

const deleteMangaFromUser = async (
  id: string,
  mangaId: string
): Promise<User> => {
  const { data } = await axios.put(
    `${apiBaseUrl}/user/${id}/removeManga`,
    {
      mangaId: mangaId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

const addNewUser = async (username: string, password: string) => {
  const { data } = await axios.post(`${apiBaseUrl}/user`, {
    username,
    password,
  });

  return data;
};

export default { getUser, addMangaToUser, deleteMangaFromUser, addNewUser };
