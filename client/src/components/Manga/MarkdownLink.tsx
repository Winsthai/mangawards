import React from "react";
import { Link } from "@mui/material";

// Custom component to render links that open in a new tab
const MarkdownLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </Link>
);

export default MarkdownLink;
