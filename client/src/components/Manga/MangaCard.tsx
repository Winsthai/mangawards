import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { BasicManga } from "../../types";
import { Link } from "react-router-dom";

const proxyLink = "https://res.cloudinary.com/dxdkcfww1/image/fetch/";

const MangaCard = ({ manga }: { manga: BasicManga }) => {
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
        width: "100%", // Make it full width
        maxWidth: "100%", // Ensure it doesn't exceed the container's width
        mx: "auto", // Horizontally center the box
      }}
    >
      {/* Container Box */}
      <Card
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#1c1f26",
          color: "white",
          marginTop: "16px",
          padding: "16px 0 16px 0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          border: "solid",
        }}
      >
        {/* Cover Image */}
        <Box
          sx={{ display: "flex", alignItems: "center", paddingRight: "16px" }}
        >
          <Box
            component="img"
            src={`${proxyLink}${manga.coverArt}.256.jpg`}
            alt="Manga cover"
            loading="lazy"
            sx={{
              width: 100,
              height: 100,
              objectFit: "contain",
              borderRadius: "4px",
              padding: 0,
            }}
          />
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
            <Box
              sx={{
                marginTop: "8px",
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
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
          }}
        >
          {/* Manga Demographic and Chapter Count */}
          <Box width="20%">
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
          <Box>
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
