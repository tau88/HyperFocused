export type ChoreRaceToolProps = {};

export type choreRacerType = {
  choreName: string;
  unitOfMeasurement: string;
  unitsPerSecond: string;
};

export const initialChoreList: choreRacerType[] = [
  {
    choreName: "Folding Laundry",
    unitOfMeasurement: "Clothes Folded",
    unitsPerSecond: "Seconds / Fold",
  },
  {
    choreName: "Washing Dishes",
    unitOfMeasurement: "Dishes Washed",
    unitsPerSecond: "Seconds / Dish",
  },
  {
    choreName: "Making the Bed",
    unitOfMeasurement: "None",
    unitsPerSecond: "None",
  },
  {
    choreName: "CUSTOM: Sweeping and Mopping the Kitchen",
    unitOfMeasurement: "",
    unitsPerSecond: "",
  },
  {
    choreName: "CUSTOM: Water the Plants",
    unitOfMeasurement: "",
    unitsPerSecond: "",
  },
];

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
