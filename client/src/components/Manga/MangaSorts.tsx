import {
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Stack,
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
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Typography>Sort by:</Typography>
      <ToggleButtonGroup
        value={sort}
        exclusive
        onChange={handleSort}
        aria-label="sort manga by"
        color="info"
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
          }}
        >
          Year (Descending)
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default MangaSorts;
