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
import { useEffect, useState } from "react";
import awardService from "../../services/awards";

const AwardsFilter = ({
  awards,
  handleAwardsFilter,
}: {
  awards: string[];
  handleAwardsFilter: (event: SelectChangeEvent<string[]>) => void;
}) => {
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const awardTitles = async () => {
      const awards = await awardService.getAwardTitles();
      setTitles(awards.map((award) => award.award));
      setLoading(false); // Set loading to false once data is fetched
    };
    void awardTitles();
  }, []);

  return (
    <Stack>
      <Typography sx={{ marginBottom: "10px" }}>Awards</Typography>
      <Select
        multiple
        value={awards}
        onChange={handleAwardsFilter}
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
        {loading
          ? []
          : titles.map((award) => (
              <MenuItem key={award} value={award}>
                <Checkbox checked={awards.indexOf(award) > -1} />
                <ListItemText primary={award} />
              </MenuItem>
            ))}
      </Select>
    </Stack>
  );
};

export default AwardsFilter;
