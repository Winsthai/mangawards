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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Award } from "../../types";
import { useState } from "react";

const AwardInfo = ({ award }: { award: Award }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ backgroundColor: "#1c1f26", color: "white" }}>
      <CardContent>
        {/* Award Name */}
        <Typography
          variant="h4"
          fontWeight="bolder"
          sx={{ marginBottom: "1em" }}
        >
          {award.award}
        </Typography>

        {/* Award Description */}
        <Typography
          variant="body1"
          className="display-linebreak"
          sx={{ marginBottom: "1em" }}
        >
          {award.description}
        </Typography>

        {/* Award Country */}
        <Typography variant="body2">
          <strong>Country:</strong> {award.country}
        </Typography>

        {/* Award Sponsor */}
        <Typography variant="body2">
          <strong>Sponsor(s):</strong> {award.sponsor}
        </Typography>

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
            <Typography>Manga Winners</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {award.manga
                .slice()
                // Sort alphabetically
                .sort((a, b) =>
                  a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                )
                .map((manga, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={manga.title} />
                  </ListItem>
                ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Typography variant="body2" sx={{ marginTop: "1em", fontSize: 12 }}>
          (If not otherwise listed, all award descriptions were sourced from
          Wikipedia)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AwardInfo;
