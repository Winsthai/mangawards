import axios from "axios";
import { apiBaseUrl } from "../constants";
import { BasicManga, Manga } from "../types";

const getAllBasic = async (): Promise<BasicManga[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/manga?basic=true`);

  return data;
};

const getManga = async (id: string): Promise<Manga> => {
  const { data } = await axios.get(`${apiBaseUrl}/manga/${id}`);

  return data;
};

export default { getAllBasic, getManga };
