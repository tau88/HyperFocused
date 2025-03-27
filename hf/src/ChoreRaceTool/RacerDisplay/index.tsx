import React from "react";

import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import StopWatch from "./StopWatch";
import { RacerDisplayProps } from "./types";
import theme from "./theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import laundry_best from "./pics/placeholder_laundry_best.png";
import laundry_prev from "./pics/placeholder_laundry_prev.png";
import dishes_best from "./pics/placeholder_dishes_best.png";
import dishes_prev from "./pics/placeholder_dishes_prev.png";

const RacerDisplay: React.FC<RacerDisplayProps> = ({
  currentChore,
  ...props
}) => {
  const videoWidth: string = "33vw";
  const videoHeight: string = "33vh";
  const videoSpacing: string = "10vw";

  const displayVideo = (bestOrPrev: boolean) => {
    switch (currentChore) {
      case "Folding Laundry":
        return (
          <img
            src={bestOrPrev ? laundry_best : laundry_prev}
            style={{
              width: videoWidth,
              maxHeight: videoHeight,
              borderRadius: 7,
            }}
            alt="Logo"
          />
        );
      case "Washing Dishes":
        return (
          <img
            src={bestOrPrev ? dishes_best : dishes_prev}
            style={{
              width: videoWidth,
              maxHeight: videoHeight,
              borderRadius: 7,
            }}
            alt="Logo"
          />
        );
    }
  };

  const displayStats = () => {
    switch (currentChore) {
      case "Folding Laundry":
        return (
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
          >
            <Grid
              sx={{
                width: videoWidth,
              }}
            >
              <h4>32</h4>
              <h4>5:03</h4>
              <h4>9.46875</h4>
            </Grid>
            <Grid
              sx={{
                width: videoSpacing,
              }}
            >
              <h4>Clothes Folded</h4>
              <h4>Time Taken</h4>
              <h4>Seconds / Fold</h4>
            </Grid>
            <Grid
              sx={{
                width: videoWidth,
              }}
            >
              <h4>45</h4>
              <h4>8:24</h4>
              <h4>11.2</h4>
            </Grid>
          </Grid>
        );
      case "Washing Dishes":
        return (
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
          >
            <Grid
              sx={{
                width: videoWidth,
              }}
            >
              <h4>12</h4>
              <h4>3:30</h4>
              <h4>17.5</h4>
            </Grid>
            <Grid
              sx={{
                width: videoSpacing,
              }}
            >
              <h4>Dishes Washed</h4>
              <h4>Time Taken</h4>
              <h4>Seconds / Dish</h4>
            </Grid>
            <Grid
              sx={{
                width: videoWidth,
              }}
            >
              <h4>5</h4>
              <h4>1:54</h4>
              <h4>22.8</h4>
            </Grid>
          </Grid>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          backgroundColor: theme.palette.background.default,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Grid>
            <Box
              sx={{
                width: videoWidth,
                height: videoHeight,
                borderRadius: 3,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {displayVideo(true)}
            </Box>
            <h2>Personal Best</h2>
          </Grid>
          <Grid item sx={{ width: videoSpacing }} />
          <Grid>
            <Box
              sx={{
                width: videoWidth,
                height: videoHeight,
                borderRadius: 3,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {displayVideo(false)}
            </Box>
            <h2>Previous Attempt</h2>
          </Grid>
        </Grid>
        {displayStats()}
        <StopWatch />
      </div>
    </ThemeProvider>
  );
};

export default RacerDisplay;
