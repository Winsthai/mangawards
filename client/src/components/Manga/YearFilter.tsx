import {
  Stack,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const YearFilter = ({
  year,
  handleYearFilter,
  years,
}: {
  year: string;
  handleYearFilter: (event: SelectChangeEvent<string>) => void;
  years: Set<string>;
}) => {
  {
    /* Year filtering */
  }
  return (
    <Stack>
      <Typography sx={{ marginBottom: "10px" }}>Year</Typography>
      <Select
        value={year}
        onChange={handleYearFilter}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Any</em>;
          }
          return year;
        }}
        sx={{
          width: "6em",
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
        {Array.from(years)
          .sort()
          .map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
      </Select>
    </Stack>
  );
};

export default YearFilter;
