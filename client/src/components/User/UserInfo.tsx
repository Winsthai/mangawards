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
import { Link } from "react-router-dom";
import { User } from "../../types";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserInfo = ({ user }: { user: User }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ backgroundColor: "#1c1f26", color: "white" }}>
      <CardContent>
        {/* Username */}
        <Typography
          variant="h4"
          fontWeight="bolder"
          sx={{ marginBottom: "1em" }}
        >
          {user.username}
        </Typography>

        {/* Starred Manga List */}
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
            <Typography>Starred Manga ({user.starredManga.length})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {user.starredManga
                .slice()
                // Sort alphabetically
                .sort((a, b) =>
                  a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                )
                .map((manga, index) => (
                  <ListItem key={index}>
                    <Link to={`/manga/${manga.id}`}>
                      <ListItemText
                        primary={manga.title}
                        sx={{ color: "white", "&:hover": { color: "#4778c9" } }}
                      />
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

export default UserInfo;
