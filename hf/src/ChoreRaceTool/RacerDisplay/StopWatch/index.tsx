import React, { useState } from "react";

import Timer from "./Timer";
import ControlButtons from "./ControlButtons";

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && isPaused === false) {
      interval = window.setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const handleFinish = () => {
    setIsActive(false);
  };

  return (
    <div className="stop-watch">
      <Timer time={time} />
      <ControlButtons
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        handleFinish={handleFinish}
        active={isActive}
        isPaused={isPaused}
      />
    </div>
  );
}

export default StopWatch;
