import {
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const MangaSorts = ({
  sort,
  handleSort,
}: {
  sort: string;
  handleSort: (
    event: React.MouseEvent<HTMLElement>,
    newSort: string | null
  ) => void;
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <Typography
        sx={{ fontSize: { xs: "0.9em", sm: "1em" }, whiteSpace: "nowrap" }}
      >
        Sort by:
      </Typography>
      <ToggleButtonGroup
        value={sort}
        exclusive
        onChange={handleSort}
        aria-label="sort manga by"
        color="info"
        orientation={isSmallScreen ? "vertical" : "horizontal"}
      >
        <ToggleButton
          value="Awards Won"
          sx={{
            backgroundColor: "#1c1f26",
            color: "white",
            "&:hover": {
              backgroundColor: "#212c47",
            },
            outlineColor: "white",
            outlineWidth: "1px",
            outlineStyle: "solid",
            margin: "2px",
            whiteSpace: "nowrap",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          Awards Won
        </ToggleButton>
        <ToggleButton
          value="Alphabetical"
          sx={{
            backgroundColor: "#1c1f26",
            color: "white",
            "&:hover": {
              backgroundColor: "#212c47",
            },
            outlineColor: "white",
            outlineWidth: "1px",
            outlineStyle: "solid",
            margin: "2px",
            whiteSpace: "nowrap",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          Alphabetical
        </ToggleButton>
        <ToggleButton
          value="Year (Descending)"
          sx={{
            backgroundColor: "#1c1f26",
            color: "white",
            "&:hover": {
              backgroundColor: "#212c47",
            },
            outlineColor: "white",
            outlineWidth: "1px",
            outlineStyle: "solid",
            margin: "2px",
            whiteSpace: "nowrap",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          Year (Descending)
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default MangaSorts;
