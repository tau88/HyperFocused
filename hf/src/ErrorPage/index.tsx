import React from "react";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import { ErrorPageProps } from "./types";

const Error_Page: React.FC<ErrorPageProps> = ({ code, codeDesc, ...props }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: red[100],
        color: red[900],
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
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
    </div>
  );
};

export default Error_Page;
