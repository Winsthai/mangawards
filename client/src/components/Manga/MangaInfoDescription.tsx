import React from "react";
import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/system";

// Create a styled component for Typography
const StyledTypography = styled(Typography)(() => ({
  marginBottom: "1em", // Default marginBottom
  whiteSpace: "pre-line", // This mimics the display-linebreak behavior (preserves newlines)
}));

// The component to make it reusable
const MangaInfoDescription = ({
  children,
  variant = "body1",
}: {
  children: React.ReactNode;
  variant?: TypographyProps["variant"];
}) => {
  return <StyledTypography variant={variant}>{children}</StyledTypography>;
};

export default MangaInfoDescription;
