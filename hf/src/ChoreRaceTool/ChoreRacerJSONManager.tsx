import { choreRacerType } from "./types";

// Load data from file
export const loadTrialData = (): choreRacerType[] => {
  const stored = localStorage.getItem("choreData");
  const choreData = stored ? JSON.parse(stored) : null;

  // console.log(choreData.chores);
  return choreData.chores;
};

// Load data from file
export const loadTrialDataOfChore = (choreName: string): choreRacerType => {
  const stored = localStorage.getItem("choreData");
  const choreData = stored ? JSON.parse(stored) : null;

  const choreReturn = choreData?.chores.find(
    (c: any) => c.choreName === choreName
  );

  // console.log(choreData);
  // console.log(choreReturn);
  return choreReturn;
};

// Save any changes to chore data to choreData (favoriting and deleting)
export const saveChoreMenu = (newChoreData: choreRacerType[]) => {
  const stored = localStorage.getItem("choreData");
  const choreData = stored ? JSON.parse(stored) : null;
  // console.log(choreData);

  if (choreData) {
    localStorage.setItem("choreData", JSON.stringify({ chores: newChoreData }));
  }
};
