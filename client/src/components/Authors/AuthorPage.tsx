import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Author } from "../../types";
import authorService from "../../services/authors"
import { Container } from "@mui/material";
import AuthorInfo from "./AuthorInfo";

const isAuthor = (object: Author | { error: string }): boolean => {
    if ("error" in object) {
        return false;
    }
    return true;
};

const AuthorPage = () => {
    const { id } = useParams();

    const [author, setAuthor] = useState<Author | null | { error: string }>(null);
    const [loading, setLoading] = useState(true); // To manage loading state

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const fetchedAuthor = await authorService.getAuthor(id as string);
                setAuthor(fetchedAuthor);
            } catch (error) {
                if (error instanceof AxiosError) {
                    setAuthor(error.response!.data);
                }
            }
            setLoading(false); // Set loading to false once data is fetched
        };
        void fetchAuthors();
    }, [id]);

    return (
        <Container sx={{ marginTop: "20px" }}>
            {loading ? (
                <div>Loading...</div>
            ) : author ? (
                <>
                    {isAuthor(author) ? (
                        <AuthorInfo author={author as Author}></AuthorInfo>
                    ) : (
                        <>Author with id {id} does not exist</>
                    )}
                </>
            ) : (
                <>Could not retrieve data</>
            )}
        </Container>
    );
}

export default AuthorPage