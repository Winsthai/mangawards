import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { BasicManga } from "../types";

const MangaCard = ({ manga }: { manga: BasicManga }) => {
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
        }}
      >
        {/* Cover Image */}
        <Box
          sx={{ display: "flex", alignItems: "center", paddingRight: "16px" }}
        >
          <Box
            component="img"
            src={`${manga.coverArt}.256.jpg`}
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
                  sx={{ backgroundColor: "#1976d2", color: "white" }}
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
              {manga.awards.map((award) => (
                <Chip
                  size="small"
                  label={award.award}
                  key={award.award}
                  sx={{ backgroundColor: "#1976d2", color: "white" }}
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
          {/* Manga Type and Chapter Count */}
          <Box>
            <Typography variant="body2">Manga</Typography>
            <Typography variant="caption" color="#C0C0C0">
              {manga.chapters ? <>{manga.chapters} chapters</> : <></>}
            </Typography>
          </Box>

          {/* Year and Status */}
          <Box>
            <Typography variant="body2">
              {manga.year ? <>{manga.year}</> : <></>}
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
