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
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../../types";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user }: { user: User }) => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSignOut = () => {
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <Card sx={{ backgroundColor: "#1c1f26", color: "white" }}>
      <CardContent>
        {/* Username */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ marginBottom: "2em" }}
        >
          <Typography variant="h4" fontWeight="bolder">
            {user.username}
          </Typography>
          <Button
            onClick={handleSignOut}
            sx={{
              backgroundColor: "#3f51b5", // Primary button color
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none", // Keeps the button text normal-case
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#303f9f", // Darker shade on hover
              },
            }}
          >
            Log out
          </Button>
        </Stack>

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
