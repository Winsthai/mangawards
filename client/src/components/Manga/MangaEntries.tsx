import { Container, Pagination, SelectChangeEvent } from "@mui/material";
import { BasicManga } from "../../types";
import MangaCard from "./MangaCard";
import React, { useEffect, useRef, useState } from "react";
import YearFilter from "./YearFilter";
import TagsFilter from "./TagsFilter";
import SearchFilter from "./SearchFilter";
import DemographicFilter from "./DemographicFilter";
import AwardsFilter from "./AwardFilter";
import MangaSorts from "./MangaSorts";

const NUMENTRIES = 50;

const MangaEntries = ({ manga }: { manga: BasicManga[] }) => {
  const [currManga, setCurrManga] = useState<BasicManga[]>([]);
  const [page, setPage] = useState(1);

  /* Filtering */
  const [tags, setTags] = useState<string[]>([]);
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [demographic, setDemographic] = useState("");
  const [awards, setAwards] = useState<string[]>([]);
  const [sort, setSort] = useState("Awards Won");

  const years = new Set<string>();
  for (const book of manga) {
    if (book.year !== null) {
      years.add(book.year.toString());
    }
  }

  useEffect(() => {
    let sortedManga: BasicManga[];

    switch (sort) {
      case "Awards Won":
        sortedManga = manga
          .slice()
          .sort((a, b) => b.awards.length - a.awards.length);
        break;
      case "Alphabetical":
        sortedManga = manga
          .slice()
          .sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          );
        console.log(sort);
        break;
      case "Year (Descending)":
        sortedManga = manga
          .slice()
          .map((manga) => (manga.year === null ? { ...manga, year: 0 } : manga))
          .sort((a, b) => b.year! - a.year!);
        break;
      default:
        sortedManga = manga
          .slice()
          .sort((a, b) => b.awards.length - a.awards.length);
    }

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

    if (awards.length !== 0) {
      sortedManga = sortedManga.filter((manga) =>
        awards.every((award) =>
          manga.awards.some((mangaAward) => mangaAward.award === award)
        )
      );
    }

    setCurrManga(sortedManga);
    setPage(1);
  }, [manga, tags, year, search, demographic, awards, sort]);

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
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputValue.current = event.target.value;
  };

  const handleDemographicFilter = (event: SelectChangeEvent<string>) => {
    setDemographic(event.target.value);
  };

  const handleAwardsFilter = (event: SelectChangeEvent<string[]>) => {
    setAwards(event.target.value as string[]);
  };

  const handleSort = (
    event: React.MouseEvent<HTMLElement>,
    newSort: string | null
  ) => {
    if (newSort !== null) {
      setSort(newSort);
    }
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
        {/* Awards filtering */}
        <AwardsFilter
          awards={awards}
          handleAwardsFilter={handleAwardsFilter}
        ></AwardsFilter>
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
      <Container>
        <MangaSorts sort={sort} handleSort={handleSort}></MangaSorts>
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
