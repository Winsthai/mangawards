import {
  Stack,
  Typography,
  Select,
  Box,
  Chip,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { TAGS } from "../../constants";

const TagsFilter = ({
  tags,
  handleTagFilter,
}: {
  tags: string[];
  handleTagFilter: (event: SelectChangeEvent<string[]>) => void;
}) => {
  return (
    <Stack>
      <Typography sx={{ marginBottom: "10px" }}>Tags</Typography>
      <Select
        multiple
        value={tags}
        onChange={handleTagFilter}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Any</em>;
          }
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ backgroundColor: "#1976d2", color: "white" }}
                />
              ))}
            </Box>
          );
        }}
        sx={{
          backgroundColor: "#1c1f26",
          color: "white",
          width: "10em",
          flexWrap: "nowrap",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
          ".MuiSvgIcon-root ": {
            fill: "white !important",
          },
        }}
        displayEmpty
      >
        {TAGS.map((tag) => (
          <MenuItem key={tag} value={tag}>
            <Checkbox checked={tags.indexOf(tag) > -1} />
            <ListItemText primary={tag} />
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default TagsFilter;
