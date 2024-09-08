import { Container, Pagination, SelectChangeEvent } from "@mui/material";
import { BasicManga } from "../../types";
import MangaCard from "./MangaCard";
import React, { useEffect, useRef, useState } from "react";
import YearFilter from "./YearFilter";
import TagsFilter from "./TagsFilter";
import SearchFilter from "./SearchFilter";
import DemographicFilter from "./DemographicFilter";

const NUMENTRIES = 50;

const MangaEntries = ({ manga }: { manga: BasicManga[] }) => {
  const [currManga, setCurrManga] = useState<BasicManga[]>([]);
  const [page, setPage] = useState(1);

  /* Filtering */
  const [tags, setTags] = useState<string[]>([]);
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [demographic, setDemographic] = useState("");

  const years = new Set<string>();
  for (const book of manga) {
    if (book.year !== null) {
      years.add(book.year.toString());
    }
  }

  useEffect(() => {
    let sortedManga = manga.sort((a, b) => b.awards.length - a.awards.length);

    if (tags.length !== 0) {
      sortedManga = sortedManga.filter((manga) =>
        tags.every((tag) => manga.tags.includes(tag))
      );
    }

    if (year !== "") {
      sortedManga = sortedManga.filter((manga) => manga.year === Number(year));
    }

    if (search !== "") {
      sortedManga = sortedManga.filter((manga) =>
        manga.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (demographic !== "") {
      sortedManga = sortedManga.filter((manga) => {
        if (demographic === "N/A") {
          return (
            manga.demographic === null ||
            manga.demographic === demographic.toLowerCase()
          );
        }
        return manga.demographic === demographic.toLowerCase();
      });
    }

    setCurrManga(sortedManga);
    setPage(1);
  }, [manga, tags, year, search, demographic]);

  const changePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTagFilter = (event: SelectChangeEvent<string[]>) => {
    setTags(event.target.value as string[]);
  };

  const handleYearFilter = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value);
  };

  const inputValue = useRef("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearch(inputValue.current); // Update state when Enter is pressed
      console.log(search);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputValue.current = event.target.value;
  };

  const handleDemographicFilter = (event: SelectChangeEvent<string>) => {
    setDemographic(event.target.value);
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          marginTop: "2%",
          marginBottom: "2%",
          justifyContent: "space-evenly",
        }}
      >
        {/* Search filtering */}
        <SearchFilter
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        ></SearchFilter>
        {/* Tags filtering */}
        <TagsFilter tags={tags} handleTagFilter={handleTagFilter}></TagsFilter>
        {/* Demographic filtering */}
        <DemographicFilter
          demographic={demographic}
          handleDemographicFilter={handleDemographicFilter}
        ></DemographicFilter>
        {/* Year filtering */}
        <YearFilter
          year={year}
          handleYearFilter={handleYearFilter}
          years={years}
        ></YearFilter>
      </Container>
      {currManga.slice((page - 1) * 50, page * 50).map((individualManga) => (
        <MangaCard
          key={individualManga.title}
          manga={individualManga}
        ></MangaCard>
      ))}
      <Pagination
        count={Math.ceil(currManga.length / NUMENTRIES)}
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
    </div>
  );
};

export default MangaEntries;
