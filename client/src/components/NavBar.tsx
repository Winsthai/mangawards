import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { Fade, Box, Fab, Button, Stack } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const buttonStyles = {
  color: "white",
  display: "block",
  "&:hover": {
    backgroundColor: "#263d59",
    color: "#0099ff",
  },
  "&:focus": {
    outline: "none",
  },
};

const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({ threshold: 100 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
};

const ScrollTop = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    if (window !== undefined && window !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

const NavBar = () => {
  const matches = useMediaQuery("(min-width:550px)");

  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setId(user.id);
      setLoggedIn(true);
    }
  }, []);

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar
          color="transparent"
          sx={{
            backgroundColor: "#152232",
            backdropFilter: "blur(20px)",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={matches ? {} : { display: "none" }}
            >
              Mangawards
            </Typography>
            <Stack
              direction="row"
              sx={{
                flexGrow: 1,
                display: { md: "flex" },
                flexWrap: "nowrap",
                justifyContent: "space-evenly",
              }}
            >
              <Link to="/">
                <Button sx={buttonStyles}>
                  <Typography sx={matches ? {} : { fontSize: "0.9em" }}>
                    Manga
                  </Typography>
                </Button>
              </Link>
              <Link to="/awards">
                <Button sx={buttonStyles}>
                  <Typography sx={matches ? {} : { fontSize: "0.9em" }}>
                    Awards
                  </Typography>
                </Button>
              </Link>
              <Link to="/authors">
                <Button sx={buttonStyles}>
                  <Typography sx={matches ? {} : { fontSize: "0.9em" }}>
                    Authors
                  </Typography>
                </Button>
              </Link>
              {loggedIn ? (
                <Link to={`/user/${id}`}>
                  <Button sx={buttonStyles}>
                    <Typography sx={matches ? {} : { fontSize: "0.9em" }}>
                      User
                    </Typography>
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button sx={buttonStyles}>
                    <Typography sx={matches ? {} : { fontSize: "0.9em" }}>
                      Login
                    </Typography>
                  </Button>
                </Link>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <ScrollTop>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default NavBar;
