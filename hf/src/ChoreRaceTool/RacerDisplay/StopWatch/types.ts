export type StopWatchProps = { choreName: string };

export type ControlButtonsProps = {
  handleStart: () => void;
  handleReset: () => void;
  handlePauseResume: () => void;
  handleFinish: (event: React.MouseEvent<HTMLElement>) => void;
  isPaused: boolean;
  active: boolean;
};

export type TimerProps = {
  time: number;
};
