import Box from "@mui/material/Box";
import React from "react";

const PageContainer = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        minHeight: "100vh",
        padding: `3rem 0.5rem 0.5rem`,
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
