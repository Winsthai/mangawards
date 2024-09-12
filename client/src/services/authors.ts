import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Author, BasicAuthor } from "../types";

const getAuthorNames = async (): Promise<BasicAuthor[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/authors?basic=true`);

  return data;
};

const getAuthor = async (id: string): Promise<Author> => {
  const { data } = await axios.get(`${apiBaseUrl}/authors/${id}`);

  return data;
}

export default { getAuthorNames, getAuthor };
