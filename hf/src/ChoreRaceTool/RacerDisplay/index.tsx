import React from "react";

import { Grid } from "@mui/material";
// import Box from "@mui/material/Box";

import StopWatch from "./StopWatch";
import { RacerDisplayProps } from "./types";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const RacerDisplay: React.FC<RacerDisplayProps> = ({
  currentChore,
  savedChoreList,
  setSavedChoreList,
  ...props
}) => {
  const videoWidth: string = "33vw";
  // const videoHeight: string = "33vh";
  const videoSpacing: string = "10vw";

  const displayTime = (seconds: number) => {
    const timeMinute = Math.floor(seconds / 60);
    const timeSeconds = seconds % 60;

    if (timeSeconds < 10) return timeMinute + ":0" + timeSeconds;
    else return timeMinute + ":" + timeSeconds;
  };

  const displayStats = () => {
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
          <h4>{displayTime(currentChore.best.time)}</h4>
          {currentChore.unitOfMeasurement !== "None" ? (
            <>
              <h4>{currentChore.best.units}</h4>
              <h4>
                {(currentChore.best.time / currentChore.best.units).toFixed(2)}
              </h4>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          sx={{
            width: videoSpacing,
          }}
        >
          <h4>Time Taken</h4>
          {currentChore.unitOfMeasurement !== "None" ? (
            <>
              <h4>{currentChore.unitOfMeasurement}</h4>
              <h4>{currentChore.unitsPerSecond}</h4>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          sx={{
            width: videoWidth,
          }}
        >
          <h4>{displayTime(currentChore.previous.time)}</h4>
          {currentChore.unitOfMeasurement !== "None" ? (
            <>
              <h4>{currentChore.previous.units}</h4>
              <h4>
                {(
                  currentChore.previous.time / currentChore.previous.units
                ).toFixed(2)}
              </h4>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    );
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
            {/* <Box
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
            </Box> */}
            <h2>Personal Best</h2>
          </Grid>
          <Grid sx={{ width: videoSpacing }} />
          <Grid>
            {/* <Box
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
            </Box> */}
            <h2>Previous Attempt</h2>
          </Grid>
        </Grid>
        {displayStats()}
        <StopWatch
          choreName={currentChore.choreName}
          savedChoreList={savedChoreList}
          setSavedChoreList={setSavedChoreList}
        />
      </div>
    </ThemeProvider>
  );
};

export default RacerDisplay;
