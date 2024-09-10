import { useState, useEffect } from "react";
import { BasicAward } from "../../types";
import awardService from "../../services/awards"
import { Container } from "@mui/material";
import AwardCard from "./AwardCard";

const AwardEntries = () => {
    const [awards, setAwards] = useState<BasicAward[]>([]);
    const [loading, setLoading] = useState(true); // To manage loading state

    useEffect(() => {
        const fetchAwards = async () => {
            const fetchedAwards = await awardService.getBasicAwards();
            setAwards(fetchedAwards);
            setLoading(false); // Set loading to false once data is fetched
        };
        void fetchAwards();
    }, []);

    return (
        <Container>
            {loading ? <div>Loading...</div> : <div>{awards.map(award => <AwardCard award={award}></AwardCard>)}</div>}
        </Container>
    )
}

export default AwardEntries;