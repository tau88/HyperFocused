import React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import blue from "@mui/material/colors/blue";

import SettingsMenu from "./SettingsMenu";
import CountdownTimer from "./CountdownTimer";
import { PomodoroPhaseTypes, PomodoroToolProps, pomoValuesType } from "./types";
import theme from "./theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const PomodoroTool: React.FC<PomodoroToolProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const [savedValue, setSavedValue] = React.useState<pomoValuesType>({
    pomoLength: "25",
    smolRestLength: "5",
    longRestLength: "15",
    longRestCount: "4",
  });

  const [currentPhase, setCurrentPhase] =
    React.useState<PomodoroPhaseTypes>("Pomodoro");

  const [restCount, setRestCount] = React.useState<number>(
    Number(savedValue.longRestCount)
  );

  const handleNav_Home = () => {
    navigate("/");
  };

  const [settingsMenu, setSettingsMenu] = React.useState<null | HTMLElement>(
    null
  );

  const handleSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenu(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setSettingsMenu(null);
  };

  const phaseTime = () => {
    switch (currentPhase) {
      case "Pomodoro":
        return Number(savedValue.pomoLength) * 60;
      case "Short":
        return Number(savedValue.smolRestLength) * 60;
      case "Long":
        return Number(savedValue.longRestLength) * 60;
    }
  };

  const handlePhaseChange = () => {
    if (currentPhase === "Pomodoro") {
      // If currently in pomo phase, when ending, decrement count, if count hits 0, it is time for long rest

      if (restCount === 1) setCurrentPhase("Long");
      else setCurrentPhase("Short");
      setRestCount(restCount - 1);
    } else if (currentPhase === "Short") {
      // If short rest is ending, go to Pomo, no need to adjust count as it was done in ending Pomo phase
      setCurrentPhase("Pomodoro");
    } else {
      // The only remaining phase is Long Rest, and if it is ending, always go to Pomo and reset counter
      setRestCount(Number(savedValue.longRestCount));
      setCurrentPhase("Pomodoro");
    }
  };

  const handleResetCycles = () => {
    setRestCount(Number(savedValue.longRestCount));
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
          backgroundColor: blue[50],
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-label="delete" size="large">
              <HomeTwoToneIcon
                onClick={handleNav_Home}
                color="secondary"
                sx={{
                  fontSize: "36px",
                  cursor: "pointer",
                }}
              />
            </IconButton>
            <Typography
              color="secondary"
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <b>Pomodoro Tool</b>
            </Typography>
            <div>
              <IconButton aria-label="delete" size="large">
                <SettingsTwoToneIcon
                  color="secondary"
                  sx={{
                    fontSize: "36px",
                    cursor: "pointer",
                  }}
                  onClick={handleSettingsMenu}
                />
              </IconButton>
              <SettingsMenu
                open={Boolean(settingsMenu)}
                handleClose={handleCloseSettingsMenu}
                savedValue={savedValue}
                setSavedValue={setSavedValue}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ padding: "20px" }}>
          <CountdownTimer
            currentPhase={currentPhase}
            phaseTime={phaseTime()}
            restCount={restCount}
          />
          <div style={{ padding: "10px" }}>
            <Button
              onClick={handlePhaseChange}
              variant="contained"
              color="secondary"
              style={{ margin: "10px" }}
            >
              Next Phase
            </Button>
            <Button
              onClick={handleResetCycles}
              variant="contained"
              style={{ margin: "10px" }}
            >
              Restart Cycles
            </Button>
          </div>
          <div style={{ padding: "10px" }}>Current Phase: {currentPhase}</div>
          <div style={{ padding: "10px" }}>Current pomos left: {restCount}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PomodoroTool;
