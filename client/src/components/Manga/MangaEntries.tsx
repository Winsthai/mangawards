import { Pagination } from "@mui/material";
import { BasicManga } from "../../types";
import MangaCard from "./MangaCard";
import { useEffect, useState } from "react";

const NUMENTRIES = 50;

const MangaEntries = ({ manga }: { manga: BasicManga[] }) => {
  const [currManga, setCurrManga] = useState<BasicManga[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCurrManga(manga.sort((a, b) => b.awards.length - a.awards.length));
  });

  const changePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
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
