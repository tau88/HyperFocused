import { timeUnit } from "./types";

// Load data from file
export const loadTimeUnitData = (): timeUnit[] => {
  const stored = localStorage.getItem("timeUnitData");
  const timeUnitData = stored ? JSON.parse(stored) : null;

  // console.log(timeUnitData.timeUnit);
  return timeUnitData.timeUnit;
};

// Save any changes to chore data to choreData (favoriting and deleting)
export const saveTimeUnitMenu = (newTimeUnitData: timeUnit[]) => {
  const stored = localStorage.getItem("timeUnitData");
  const timeUnitData = stored ? JSON.parse(stored) : null;
  // console.log(timeUnitData);

  if (timeUnitData) {
    localStorage.setItem(
      "timeUnitData",
      JSON.stringify({ timeUnit: newTimeUnitData })
    );
  }
};
