export const userTextFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4f5768",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #1c1f26 inset", // Background color for autofill
      WebkitTextFillColor: "white", // Text color in autofill
      caretColor: "white", // Fix cursor color (caret)
      transition: "background-color 5000s ease-in-out 0s",
    },
    "& input:-webkit-autofill:hover": {
      WebkitBoxShadow: "0 0 0 1000px #1c1f26 inset",
      WebkitTextFillColor: "white",
      caretColor: "white", // Cursor color for hover
    },
    "& input:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0 1000px #1c1f26 inset",
      WebkitTextFillColor: "white",
      caretColor: "white", // Cursor color when focused
    },
    "& input:-webkit-autofill:active": {
      WebkitBoxShadow: "0 0 0 1000px #1c1f26 inset",
      WebkitTextFillColor: "white",
      caretColor: "white", // Cursor color when active
    },
  },
};
