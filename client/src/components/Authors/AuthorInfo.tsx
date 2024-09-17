import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Author } from "../../types";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const AuthorInfo = ({ author }: { author: Author }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedAwards, setExpandedAwards] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleExpandAwards = () => {
    setExpandedAwards(!expandedAwards);
  };

  const awardMap = new Map();

  for (const award of author.awards) {
    if (!awardMap.has(award.award)) {
      awardMap.set(award.award, {count: 1, id: award.id});
    } else {
      awardMap.set(award.award, {count: awardMap.get(award.award).count + 1, ...award});
    }
  }

  const awardNames: [string, string][] = [];

  awardMap.forEach((value, key) =>
    value.count === 1 ? awardNames.push([key, value.id]) : awardNames.push([`${key} (${value.count})`, value.id])
  );

  return (
    <Card sx={{ backgroundColor: "#1c1f26", color: "white" }}>
      <CardContent>
        {/* Author Name */}
        <Typography
          variant="h4"
          fontWeight="bolder"
          sx={{ marginBottom: "1em" }}
        >
          {author.name}
        </Typography>

        {/* Author Description */}
        {author.description ? (
          <Typography
            variant="body1"
            className="display-linebreak"
            sx={{ marginBottom: "1em" }}
          >
            {author.description}
          </Typography>
        ) : (
          <></>
        )}

        {/* Expandable Manga List */}
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
            <Typography>Manga ({author.manga.length})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {author.manga
                .slice()
                // Sort alphabetically
                .sort((a, b) =>
                  a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                )
                .map((manga, index) => (
                  <ListItem key={index}>
                    <Link to={`/manga/${manga.id}`}>
                      <ListItemText primary={manga.title} sx={{color: "white", "&:hover": {color: "#4778c9"}}} />
                    </Link>
                  </ListItem>
                ))}
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Expandable Award List */}
        <Accordion
          expanded={expandedAwards}
          onChange={handleExpandAwards}
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
            <Typography>Awards ({author.awards.length})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {awardNames
                .slice()
                // Sort alphabetically
                .sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase()))
                .map((award, index) => (
                  <ListItem key={index}>
                    <Link to={`/awards/${award[1]}`}>
                      <ListItemText primary={award[0]} sx={{color: "white", "&:hover": {color: "#4778c9"}}} />
                    </Link>
                  </ListItem>
                ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AuthorInfo;
