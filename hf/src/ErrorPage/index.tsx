import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ErrorPageProps } from "./types";

const Error_Page: React.FC<ErrorPageProps> = ({ code, codeDesc, ...props }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f8d7da"
      color="#721c24"
      p={4}
    >
      <Typography variant="h2" fontWeight="bold">
        {code}
      </Typography>
      <Typography variant="h5" mt={1}>
        {codeDesc}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default Error_Page;
