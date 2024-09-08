import axios from "axios";
import { apiBaseUrl } from "../constants";

const getAwardTitles = async (): Promise<{ award: string; id: string }[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/awards?titles=true`);

  return data;
};

export default { getAwardTitles };
