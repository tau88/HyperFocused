import { choreRacerType } from "../types";

export type RacerDisplayProps = {
  currentChore: choreRacerType;
  savedChoreList: choreRacerType[];
  setSavedChoreList: React.Dispatch<React.SetStateAction<choreRacerType[]>>;
};
