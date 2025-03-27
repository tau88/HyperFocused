export type StopWatchProps = {};

export type ControlButtonsProps = {
  handleStart: () => void;
  handleReset: () => void;
  handlePauseResume: () => void;
  handleFinish: () => void;
  isPaused: boolean;
  active: boolean;
};

export type TimerProps = {
  time: number;
};
