import {
  Stack,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { DEMOGRAPHICS } from "../../constants";

const DemographicFilter = ({
  demographic,
  handleDemographicFilter,
}: {
  demographic: string;
  handleDemographicFilter: (event: SelectChangeEvent<string>) => void;
}) => {
  {
    /* Demographic filtering */
  }
  return (
    <Stack>
      <Typography sx={{ marginBottom: "10px" }}>Demographic</Typography>
      <Select
        value={demographic}
        onChange={handleDemographicFilter}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Any</em>;
          }
          return demographic;
        }}
        sx={{
          width: "8em",
          backgroundColor: "#1c1f26",
          color: "white",
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
        <MenuItem value="">Any</MenuItem>
        {DEMOGRAPHICS.map((demographic) => (
          <MenuItem key={demographic} value={demographic}>
            {demographic}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default DemographicFilter;
