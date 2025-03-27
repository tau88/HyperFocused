import React from "react";

import Typography from "@mui/material/Typography";

import { TimerProps } from "./types";

const Timer: React.FC<TimerProps> = ({ time }, ...props) => {
  return (
    <div className="timer">
      <Typography variant="h2">
        <span className="digits">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </Typography>
    </div>
  );
};

export default Timer;
