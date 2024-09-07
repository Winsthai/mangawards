import {
  Box,
  Checkbox,
  Chip,
  Container,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { BasicManga } from "../../types";
import MangaCard from "./MangaCard";
import React, { useEffect, useState } from "react";
import { TAGS } from "../../constants";

const NUMENTRIES = 50;

const MangaEntries = ({ manga }: { manga: BasicManga[] }) => {
  const [currManga, setCurrManga] = useState<BasicManga[]>([]);
  const [page, setPage] = useState(1);

  /* Filtering */
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const sortedManga = manga.sort((a, b) => b.awards.length - a.awards.length);

    if (tags.length !== 0) {
      setCurrManga(
        sortedManga.filter((manga) =>
          tags.every((tag) => manga.tags.includes(tag))
        )
      );
    } else {
      setCurrManga(sortedManga);
    }
  }, [tags]);

  const changePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTagFilter = (event: SelectChangeEvent<string[]>) => {
    setTags(event.target.value);
  };

  return (
    <div>
      <Container sx={{ display: "flex", marginTop: "2%" }}>
        {/* Tags filtering */}
        <Stack>
          <Typography sx={{ marginBottom: "10px" }}>Tags</Typography>
          <Select
            multiple
            value={tags}
            onChange={handleTagFilter}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Any</em>;
              }
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ backgroundColor: "#1976d2", color: "white" }}
                    />
                  ))}
                </Box>
              );
            }}
            sx={{
              backgroundColor: "#1c1f26",
              color: "white",
            }}
            displayEmpty
          >
            {TAGS.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={tags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </Stack>
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
