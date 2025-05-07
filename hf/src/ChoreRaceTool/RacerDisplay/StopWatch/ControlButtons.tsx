import React from "react";

import Button from "@mui/material/Button";

import { ControlButtonsProps } from "./types";
import { Grid } from "@mui/material";

const ControlButtons: React.FC<ControlButtonsProps> = (
  {
    handleStart,
    handleReset,
    handlePauseResume,
    handleFinish,
    isPaused,
    active,
  },
  ...props
) => {
  const StartButton = (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{ mt: 3 }}
      onClick={handleStart}
    >
      Start!
    </Button>
  );
  const ActiveButtons = (
    <Grid
      container
      spacing={3}
      sx={{
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3 }}
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3 }}
        onClick={handlePauseResume}
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3 }}
        onClick={handleFinish}
      >
        Finish!
      </Button>
    </Grid>
  );

  return <div>{active ? ActiveButtons : StartButton}</div>;
};

export default ControlButtons;
