import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Container,
} from "@mui/material";
import { BasicManga } from "../../types";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";

const proxyLink = "https://res.cloudinary.com/dxdkcfww1/image/fetch/";

const MangaCard = ({ manga }: { manga: BasicManga }) => {
  const { user } = useUserContext();
  let starredManga = null;
  if (user) {
    starredManga = user.starredManga.map((manga) => manga.title);
  }

  let borderColor = "white";

  if (starredManga && starredManga.includes(manga.title)) {
    borderColor = "yellow";
  }

  const awardMap = new Map();

  for (const award of manga.awards) {
    if (!awardMap.has(award.award)) {
      awardMap.set(award.award, 1);
    } else {
      awardMap.set(award.award, awardMap.get(award.award) + 1);
    }
  }

  const awardChips: string[] = [];

  awardMap.forEach((value, key) =>
    value === 1 ? awardChips.push(key) : awardChips.push(`${key} (${value})`)
  );

  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      {/* Container Box */}
      <Card
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", // Stack content vertically on small screens
            sm: "row", // Horizontal layout on larger screens
          },
          width: "100%",
          height: "100%",
          backgroundColor: "#1c1f26",
          color: "white",
          marginTop: "16px",
          padding: {
            xs: "8px", // Less padding on small screens
            sm: "16px", // Normal padding on larger screens
          },
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          border: `solid ${borderColor}`,
        }}
      >
        {/* Cover Image */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingRight: {
              xs: "0px", // Remove right padding on small screens
              sm: "16px", // Normal padding on larger screens
            },
            justifyContent: "center", // Center the image on mobile
            marginBottom: {
              xs: "16px", // Add margin on smaller screens
              sm: 0, // No margin on larger screens
            },
          }}
        >
          <Link to={`/manga/${manga.id}`}>
            <Box
              component="img"
              src={`${proxyLink}${manga.coverArt}.256.jpg`}
              alt="Manga cover"
              loading="lazy"
              sx={{
                width: {
                  xs: 80, // Smaller image on mobile
                  sm: 100, // Default size on larger screens
                },
                height: {
                  xs: 80,
                  sm: 100,
                },
                objectFit: "contain",
                borderRadius: "4px",
                padding: 0,
              }}
            />
          </Link>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Manga Title and Tags */}
          <CardContent sx={{ padding: 0 }}>
            <Container
              maxWidth={false}
              disableGutters
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "left" },
              }}
            >
              <Typography
                variant="h6"
                component={Link}
                to={`/manga/${manga.id}`}
                sx={{
                  fontWeight: "bold",
                  display: "inline",
                  color: "white",
                  textShadow: "1px 1px 2px black",
                }}
              >
                {manga.title}
              </Typography>
            </Container>
            <Box
              sx={{
                marginTop: "8px",
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "left" },
              }}
            >
              <Typography>Tags:</Typography>
              {manga.tags.map((tag) => (
                <Chip
                  label={tag}
                  key={tag}
                  size="small"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontWeight: "500",
                  }}
                />
              ))}
            </Box>
            <Box
              sx={{
                marginTop: "8px",
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "left" },
              }}
            >
              <Typography>Awards:</Typography>
              {awardChips.map((award) => (
                <Chip
                  size="small"
                  label={award}
                  key={award}
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "500",
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 3,
            flexDirection: {
              xs: "column", // Stack stats vertically on mobile
              sm: "row", // Horizontal layout on larger screens
            },
          }}
        >
          {/* Manga Demographic and Chapter Count */}
          <Box>
            <Typography variant="body2">
              {manga.demographic
                ? manga.demographic === "n/a"
                  ? "N/A"
                  : manga.demographic.charAt(0).toUpperCase() +
                    manga.demographic.slice(1)
                : "N/A"}
            </Typography>
            <Typography variant="caption" color="#C0C0C0">
              {manga.chapters ? <>{manga.chapters} chapters</> : <></>}
            </Typography>
          </Box>

          {/* Year and Status */}
          <Box sx={{ marginBottom: "1em" }}>
            <Typography variant="body2">
              {manga.year ? <>{manga.year}</> : <>Year N/A</>}
            </Typography>
            <Typography variant="caption" color="#C0C0C0">
              {manga.status}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default MangaCard;
