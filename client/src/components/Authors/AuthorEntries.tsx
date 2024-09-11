import { Container, Pagination, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import authorService from "../../services/authors";
import AuthorCard from "./AuthorCard";
import { BasicAuthor } from "../../types";
import AuthorSorts from "./AuthorSorts";
import { NUMENTRIES } from "../../constants";
import SearchFilter from "../SearchFilter";

const AuthorEntries = () => {
  const [initAuthors, setInitAuthors] = useState<BasicAuthor[]>([]);
  const [authors, setAuthors] = useState<BasicAuthor[]>([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("Awards Won");

  useEffect(() => {
    const fetchAuthors = async () => {
      const fetchedAuthors = await authorService.getAuthorNames();
      // Sort alphabetically
      setInitAuthors(
        fetchedAuthors
          .slice()
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
      );
      setLoading(false); // Set loading to false once data is fetched
    };
    void fetchAuthors();
  }, []);

  useEffect(() => {
    let sortedAuthors: BasicAuthor[];

    switch (sort) {
      case "Awards Won":
        sortedAuthors = initAuthors
          .slice()
          .sort((a, b) => b.awards.length - a.awards.length);
        break;
      case "Alphabetical":
        sortedAuthors = initAuthors
          .slice()
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
        break;
      default:
        sortedAuthors = initAuthors
          .slice()
          .sort((a, b) => b.awards.length - a.awards.length);
        break;
    }

    if (search !== "") {
      sortedAuthors = sortedAuthors.filter((author) =>
        author.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setAuthors(sortedAuthors);
    setPage(1);
  }, [initAuthors, search, sort]);

  const changePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSort = (
    _event: React.MouseEvent<HTMLElement>,
    newSort: string | null
  ) => {
    if (newSort !== null) {
      setSort(newSort);
    }
  };

  const inputValue = useRef("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearch(inputValue.current); // Update state when Enter is pressed
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputValue.current = event.target.value;
  };

  return (
    <Container>
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <SearchFilter
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        ></SearchFilter>
        <AuthorSorts sort={sort} handleSort={handleSort}></AuthorSorts>
      </Stack>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {authors.slice((page - 1) * 50, page * 50).map((author) => (
            <AuthorCard key={author.name} author={author}></AuthorCard>
          ))}
        </div>
      )}
      <Pagination
        count={Math.ceil(authors.length / NUMENTRIES)}
        color="primary"
        page={page}
        size="large"
        onChange={changePage}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white", // Change the page number color
          },
          display: "flex",
          justifyContent: "center",
          margin: "4% 0 4% 0",
        }}
      />
    </Container>
  );
};

export default AuthorEntries;
