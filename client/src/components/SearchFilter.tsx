import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchFilter = ({
  handleChange,
  handleKeyDown,
}: {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      onChange={handleChange} // Update input value but not state
      onKeyDown={handleKeyDown} // Trigger state update on Enter key
      helperText="Press enter to search"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                  ".MuiTouchRipple-child": {
                    backgroundColor: "black",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
            </InputAdornment>
          ),
        },
        inputLabel: {
          style: { color: "#fff" },
        },
        formHelperText: {
          style: { color: "#fff" },
        },
      }}
      sx={{
        input: { color: "white" },
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "yellow",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
      }}
    ></TextField>
  );
};

export default SearchFilter;
