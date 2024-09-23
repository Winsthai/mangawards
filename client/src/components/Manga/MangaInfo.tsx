import { useEffect, useState } from "react";
import { Manga, User } from "../../types";
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
  SelectChangeEvent,
  MenuItem,
  Select,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import MangaInfoDescription from "./MangaInfoDescription";
import userService from "../../services/user";

const MangaInfo = ({ manga }: { manga: Manga }) => {
  const [starred, setStarred] = useState(false);

  const { user, setUser } = useUserContext();

  useEffect(() => {
    let starredManga = null;
    if (user) {
      starredManga = user.starredManga.map((manga) => manga.title);
    }

    if (starredManga && starredManga.includes(manga.title)) {
      setStarred(true);
    }
  }, [manga.title, user]);

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleStar = async (event: SelectChangeEvent<string>) => {
    if (event.target.value === "No") {
      // Remove from starred manga via API
      await userService.deleteMangaFromUser(user!.id, manga.id);

      // Remove from context
      const newUser: User = {
        ...user,
        starredManga: user!.starredManga.filter(
          (starredManga) => starredManga.id !== manga.id
        ),
      } as User;
      setUser(newUser);

      setStarred(false);
    } else if (event.target.value === "Yes") {
      // Add to starred manga via API
      await userService.addMangaToUser(user!.id, manga.id);

      // Add to context
      const newUser = {
        ...user,
        starredManga: user!.starredManga.concat({
          title: manga.title,
          id: manga.id,
        }),
      } as User;
      setUser(newUser);
      console.log(
        user?.starredManga.filter(
          (starredManga) => starredManga.id !== manga.id
        )
      );

      setStarred(true);
    }
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
            <MangaInfoDescription>{manga.description}</MangaInfoDescription>
          ) : (
            <></>
          )}

          {/* Manga Tags */}
          <MangaInfoDescription>
            Genres: {manga.tags.join(", ")}
          </MangaInfoDescription>

          {/* Manga Volumes and Chapters */}
          {manga.volumes && manga.chapters ? (
            <MangaInfoDescription>
              Volumes: {manga.volumes} <br />
              Chapters: {manga.chapters}
            </MangaInfoDescription>
          ) : (
            <></>
          )}

          {/* Manga demographic */}
          {manga.demographic ? (
            <MangaInfoDescription>
              Demographic: {manga.demographic}
            </MangaInfoDescription>
          ) : (
            <></>
          )}

          {/* Manga Status */}
          <MangaInfoDescription>Status: {manga.status}</MangaInfoDescription>

          {/* Manga year */}
          <MangaInfoDescription>
            {manga.year ? `Year: ${manga.year}` : ""}
          </MangaInfoDescription>

          {/* Star button */}
          {user ? (
            <>
              <MangaInfoDescription>Star this manga?</MangaInfoDescription>
              <Select
                value={starred ? "Yes" : "No"}
                onChange={handleStar}
                sx={{
                  width: "6em",
                  backgroundColor: "#1c1f26",
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                }}
                displayEmpty
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </>
          ) : (
            <></>
          )}

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
