import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { CountdownTimerProps } from "./types";

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  currentPhase,
  phaseTime,
  restCount,
  ...props
}) => {
  const [timeLeft, setTimeLeft] = React.useState(phaseTime);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft, phaseTime]);

  // Trigger clock update (set to next phase's time) whenever phase changes
  React.useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPhase]);

  const handleStart = () => {
    if (timeLeft === 0) setTimeLeft(Number(phaseTime));
    setIsActive(true);
  };

  const handleStop = () => setIsActive(false);

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(Number(phaseTime));
  };

  const formatTime = (seconds: number) => {
    if (seconds > 0) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    } else {
      return `DONE!`;
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h2">{formatTime(timeLeft)}</Typography>

      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={handleStart}
          data-testid={"start-time-button"}
          variant="contained"
          color={"secondary"}
          disabled={isActive}
        >
          Start
        </Button>
        <Button
          onClick={handleStop}
          data-testid={"stop-time-button"}
          variant="contained"
          color="secondary"
          disabled={!isActive}
          style={{ marginLeft: "10px" }}
        >
          Stop
        </Button>
        <Button
          onClick={handleReset}
          data-testid={"reset-time-button"}
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
