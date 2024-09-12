import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { BasicAuthor } from "../../types";
import { Link } from "react-router-dom";

const AuthorCard = ({ author }: { author: BasicAuthor }) => {
  const awardMap = new Map();

  for (const award of author.awards) {
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
          width: "100%",
          height: "100%",
          backgroundColor: "#1c1f26",
          color: "white",
          marginTop: "16px",
          padding: "16px 0 0 0",
        }}
      >
        <CardContent sx={{ padding: 0, marginLeft: "3%" }}>
          <Typography variant="h6" fontWeight="bold" component={Link} to={`/authors/${author.id}`} sx={{ display: "inline", color: "#4778c9" }}>
            {author.name}
          </Typography>
          <Box
            sx={{
              marginTop: "8px",
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body1">Awards:</Typography>
            {awardChips.map((award) => (
              <Chip
                size="small"
                label={award}
                key={award}
                sx={{ backgroundColor: "green", color: "white" }}
              />
            ))}
          </Box>
          <Typography variant="body2" sx={{ marginTop: "0.5%" }}>
            Total awards: {author.awards.length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthorCard;
