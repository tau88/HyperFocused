import { choreRacerType } from "../../types";

export type StopWatchProps = {
  choreName: string;
  setSavedChoreList: React.Dispatch<React.SetStateAction<choreRacerType[]>>;
};

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
