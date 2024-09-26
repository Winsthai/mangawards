import {
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Stack,
} from "@mui/material";

const AuthorSorts = ({
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
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
      sx={{ alignItems: "center" }}
    >
      <Typography
        variant="body1"
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
      </ToggleButtonGroup>
    </Stack>
  );
};

export default AuthorSorts;
