import { choreRacerType } from "../types";

export type RacerDisplayProps = {
  currentChore: choreRacerType;
  setSavedChoreList: React.Dispatch<React.SetStateAction<choreRacerType[]>>;
};
