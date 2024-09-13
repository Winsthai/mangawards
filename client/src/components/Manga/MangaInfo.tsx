import { useState } from "react";
import { Manga } from "../../types";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MangaInfo = ({ manga }: { manga: Manga }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const awardMap = new Map();

  for (const award of manga.awards) {
    if (!awardMap.has(award.award)) {
      awardMap.set(award.award, 1);
    } else {
      awardMap.set(award.award, awardMap.get(award.award) + 1);
    }
  }

  const awardNames: string[] = [];

  awardMap.forEach((value, key) =>
    value === 1 ? awardNames.push(key) : awardNames.push(`${key} (${value})`)
  );

  return (
    <Card sx={{ backgroundColor: "#1c1f26", color: "white" }}>
      <CardContent>
        {/* Manga Name */}
        <Typography
          variant="h4"
          fontWeight="bolder"
          sx={{ marginBottom: "1em" }}
        >
          {manga.title}
        </Typography>

        {/* Manga Author and Artist */}
        <Typography
          variant="body1"
          className="display-linebreak"
          sx={{ marginBottom: "1em" }}
        >
          Author: {manga.author.name} <br />
          Artist: {manga.artist.name}
        </Typography>

        {/* Manga Description */}
        {manga.description ? (
          <Typography
            variant="body1"
            className="display-linebreak"
            sx={{ marginBottom: "1em" }}
          >
            {manga.description}
          </Typography>
        ) : (
          <></>
        )}

        {/* Manga Original Language */}
        <Typography
          variant="body1"
          className="display-linebreak"
          sx={{ marginBottom: "1em" }}
        >
          {manga.originalLanguage}
        </Typography>

        {/* Manga Volumes and Chapters */}
        <Typography
          variant="body1"
          className="display-linebreak"
          sx={{ marginBottom: "1em" }}
        >
          {manga.volumes ? <>Volumes: {manga.volumes}</> : <></>} <br />
          {manga.chapters ? <>Chapters: {manga.chapters}</> : <></>}
        </Typography>

        {/* Manga demographic */}
        {manga.demographic ? (
          <Typography
            variant="body1"
            className="display-linebreak"
            sx={{ marginBottom: "1em" }}
          >
            Demographic: {manga.demographic}
          </Typography>
        ) : (
          <></>
        )}

        {/* Manga Status */}
        <Typography
          variant="body1"
          className="display-linebreak"
          sx={{ marginBottom: "1em" }}
        >
          {manga.status}
        </Typography>

        {/* Manga year */}
        <Typography
          variant="body1"
          className="display-linebreak"
          sx={{ marginBottom: "1em" }}
        >
          {manga.year}
        </Typography>

        {/* Manga Tags */}

        {/* Expandable Award List */}
        <Accordion
          expanded={expanded}
          onChange={handleExpand}
          sx={{
            backgroundColor: "#191a1c",
            color: "white",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="manga-list-content"
            id="manga-list-header"
            sx={{
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#474a4f", // Change color on hover
              },
            }}
          >
            <Typography>Awards ({manga.awards.length})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {awardNames
                .slice()
                // Sort alphabetically
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map((award, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={award} />
                  </ListItem>
                ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Typography variant="body2" sx={{ marginTop: "1em", fontSize: 12 }}>
          (Manga information retrieved from Mangadex)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MangaInfo;
