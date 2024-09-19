import { styled, TextField } from "@mui/material";

// Create a styled TextField component
const UserTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4f5768",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #1c1f26 inset",
    WebkitTextFillColor: "white",
    caretColor: "white",
    transition: "background-color 5000s ease-in-out 0s",
  },
  "& input:-webkit-autofill:hover": {
    WebkitBoxShadow: "0 0 0 1000px #1c1f26 inset",
    WebkitTextFillColor: "white",
    caretColor: "white",
  },
  "& input:-webkit-autofill:focus": {
    WebkitBoxShadow: "0 0 0 1000px #1c1f26 inset",
    WebkitTextFillColor: "white",
    caretColor: "white",
  },
  "& input:-webkit-autofill:active": {
    WebkitBoxShadow: "0 0 0 1000px #1c1f26 inset",
    WebkitTextFillColor: "white",
    caretColor: "white",
  },
  "& label": {
    color: "#b0b3b8",
  },
  "& label.Mui-focused": {
    color: "white",
  },
}));

export default UserTextField;
