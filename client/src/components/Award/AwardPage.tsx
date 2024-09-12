import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import awardService from "../../services/awards";
import { useEffect, useState } from "react";
import { Award } from "../../types";
import { AxiosError } from "axios";
import AwardInfo from "./AwardInfo";

const isAward = (object: Award | { error: string }): boolean => {
  if ("error" in object) {
    return false;
  }
  return true;
};

const AwardPage = () => {
  const { id } = useParams();

  const [award, setAward] = useState<Award | null | { error: string }>(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const fetchedAward = await awardService.getAward(id as string);
        setAward(fetchedAward);
      } catch (error) {
        if (error instanceof AxiosError) {
          setAward(error.response!.data);
        }
      }
      setLoading(false); // Set loading to false once data is fetched
    };
    void fetchAward();
  }, [id]);

  return (
    <Container sx={{ marginTop: "20px" }}>
      {loading ? (
        <div>Loading...</div>
      ) : award ? (
        <>
          {isAward(award) ? (
            <AwardInfo award={award as Award}></AwardInfo>
          ) : (
            <>Award with id {id} does not exist</>
          )}
        </>
      ) : (
        <>Could not retrieve data</>
      )}
    </Container>
  );
};

export default AwardPage;
