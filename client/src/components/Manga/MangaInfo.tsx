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
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const MangaInfo = ({ manga }: { manga: Manga }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const awardMap = new Map();

  for (const award of manga.awards) {
    if (!awardMap.has(award.award)) {
      awardMap.set(award.award, { count: 1, id: award.id });
    } else {
      awardMap.set(award.award, {
        count: awardMap.get(award.award).count + 1,
        ...award,
      });
    }
  }

  const awardNames: [string, string][] = [];

  awardMap.forEach((value, key) =>
    value.count === 1
      ? awardNames.push([key, value.id])
      : awardNames.push([`${key} (${value.count})`, value.id])
  );

  return (
    <div style={{ alignItems: "center" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "200px", sm: "250px", md: "300px" },
          margin: "0 2vw 0 2vw",
        }}
      >
        {/* Blurred background image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${manga.coverArt})`, // Replace with the correct path
            backgroundSize: "cover",
            backgroundPosition: "50% 25%",
            filter: "blur(4px) brightness(0.5)",
            transform: "scale(1.2)", // Slight zoom for background
            zIndex: 1,
          }}
        ></Box>

        {/* Overlay with the main content */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            zIndex: 2,
            height: "100%",
            padding: "16px",
          }}
        >
          {/* Manga Cover Image */}
          <Box
            sx={{
              flex: "0 0 auto",
              width: { xs: "100px", sm: "150px", md: "180px" },
              height: "auto",
              borderRadius: "8px",
              marginTop: "auto",
            }}
          >
            <img
              src={`${manga.coverArt}.256.jpg`} // Replace with the correct path
              alt={manga.title}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain", // Ensures the image is not cropped and fully visible
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>

          {/* Text Section */}
          <Box sx={{ marginLeft: "40px" }}>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 2px black",
              }}
            >
              {manga.title}
            </Typography>
            <Typography
              variant="body1"
              display="inline"
              component={Link}
              to={`/authors/${manga.author.id}`}
              sx={{
                color: "white",
                marginTop: "4px",
                textShadow: "1px 1px 2px black",
              }}
            >
              {manga.author.name}
            </Typography>
            {manga.author.name !== manga.artist.name ? (
              <>
                <Typography
                  variant="body1"
                  display="inline"
                  sx={{
                    color: "white",
                    marginTop: "4px",
                    textShadow: "1px 1px 2px black",
                  }}
                >
                  ,{" "}
                </Typography>
                <Typography
                  variant="body1"
                  display="inline"
                  component={Link}
                  to={`/authors/${manga.artist.id}`}
                  sx={{
                    color: "white",
                    marginTop: "4px",
                    textShadow: "1px 1px 2px black",
                  }}
                >
                  {`${manga.artist.name}`}
                </Typography>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>

      <Card
        sx={{
          backgroundColor: "#1c1f26",
          color: "white",
          marginTop: "30px",
          padding: "2em 2vw 1em 2vw",
        }}
      >
        <CardContent>
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

          {/* Manga Tags */}
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            Genres: {manga.tags.join(", ")}
          </Typography>

          {/* Manga Volumes and Chapters */}
          {manga.volumes && manga.chapters ? (
            <Typography
              variant="body1"
              className="display-linebreak"
              sx={{ marginBottom: "1em" }}
            >
              Volumes: {manga.volumes} <br />
              Chapters: {manga.chapters}
            </Typography>
          ) : (
            <></>
          )}

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
            Status: {manga.status}
          </Typography>

          {/* Manga year */}
          <Typography
            variant="body1"
            className="display-linebreak"
            sx={{ marginBottom: "1em" }}
          >
            {manga.year ? `Year: ${manga.year}` : ""}
          </Typography>

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
                  .sort((a, b) =>
                    a[0].toLowerCase().localeCompare(b[0].toLowerCase())
                  )
                  .map((award, index) => (
                    <ListItem key={index}>
                      <Link to={`/awards/${award[1]}`}>
                        <ListItemText
                          primary={award[0]}
                          sx={{
                            color: "white",
                            "&:hover": { color: "#4778c9" },
                          }}
                        />
                      </Link>
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
    </div>
  );
};

export default MangaInfo;
