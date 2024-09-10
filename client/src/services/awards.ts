import axios from "axios";
import { apiBaseUrl } from "../constants";
import { BasicAward } from "../types";

const getAwardTitles = async (): Promise<{ award: string; id: string }[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/awards?titles=true`);

  return data;
};

const getBasicAwards = async (): Promise<BasicAward[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/awards?basic=true`);

  return data;
}

export default { getAwardTitles, getBasicAwards };
