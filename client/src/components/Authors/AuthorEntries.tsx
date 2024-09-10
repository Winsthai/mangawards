import { Container } from "@mui/material";
import { useState } from "react";

const AuthorEntries = () => {
    const [authors, setAuthors] = useState<[]>([]);
    const [loading, setLoading] = useState(true); // To manage loading state

    return (
        <Container>
            {loading ? <div>Loading...</div> : <div></div>}
        </Container>
    )
}

export default AuthorEntries;