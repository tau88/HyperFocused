import { choreRacerType } from "../types";

export type SettingsMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  currentChore: choreRacerType;
  setCurrentChore: React.Dispatch<React.SetStateAction<choreRacerType>>;
  savedChoreList: choreRacerType[];
  setSavedChoreList: React.Dispatch<React.SetStateAction<choreRacerType[]>>;
};

export type NewChoreMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  /** Saved values for pomodoro settings */
  savedChoreList: choreRacerType[];
  /** Set saved values for pomodoro settings */
  setSavedChoreList: React.Dispatch<React.SetStateAction<choreRacerType[]>>;
};

export type DeleteChoreMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  /** name of chore to be deleted */
  choreName: string;
  currentChore: choreRacerType;
  setCurrentChore: React.Dispatch<React.SetStateAction<choreRacerType>>;
  savedChoreList: choreRacerType[];
  setSavedChoreList: React.Dispatch<React.SetStateAction<choreRacerType[]>>;
};
