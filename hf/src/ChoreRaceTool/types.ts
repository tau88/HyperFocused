export type ChoreRaceToolProps = {};

export type choreRacerType = {
  choreName: string;
  unitOfMeasurement: string;
  unitsPerSecond: string;
  favorite: boolean;
  best: {
    units: number;
    time: number;
  };
  previous: {
    units: number;
    time: number;
  };
};

export type SettingsMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  /** Saved values for pomodoro settings */
  savedChoreList: choreRacerType[];
  /** Set saved values for pomodoro settings */
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
  /** Saved values for pomodoro settings */
  savedChoreList: choreRacerType[];
  /** Set saved values for pomodoro settings */
  setSavedChoreList: React.Dispatch<React.SetStateAction<choreRacerType[]>>;
};
