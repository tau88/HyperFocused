import { choreRacerType } from "./types";

// Load data from file
export const loadTrialData = (): choreRacerType[] => {
  const stored = localStorage.getItem("choreData");
  const choreData = stored ? JSON.parse(stored) : null;

  console.log(choreData.chores);
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

// Save new time to file, this version is for chores with units
export const saveTrialDataUnits = (
  choreName: string,
  time: number,
  units: number
) => {
  const stored = localStorage.getItem("choreData");
  const choreData = stored ? JSON.parse(stored) : null;

  if (choreData) {
    const updatedChores = choreData.chores.map((chore: choreRacerType) => {
      if (chore.choreName === choreName) {
        const pastBestRatio = chore.best.time / chore.best.units;
        const currentRatio = time / units;
        if (currentRatio < pastBestRatio)
          return {
            ...chore,
            best: { units: units, time: time },
            previous: { units: units, time: time },
          };
        else
          return {
            ...chore,
            previous: { units: units, time: time },
          };
      }
      return chore;
    });

    localStorage.setItem(
      "choreData",
      JSON.stringify({ chores: updatedChores })
    );
  }
};

// Save new time to file, this version is for chores with units
export const saveTrialDataNoUnits = (choreName: string, time: number) => {
  const stored = localStorage.getItem("choreData");
  const choreData = stored ? JSON.parse(stored) : null;

  if (choreData) {
    const updatedChores = choreData.chores.map((chore: choreRacerType) => {
      if (chore.choreName === choreName) {
        if (time < chore.best.time)
          return {
            ...chore,
            best: { time: time },
            previous: { time: time },
          };
        else
          return {
            ...chore,
            previous: { time: time },
          };
      }
      return chore;
    });

    localStorage.setItem(
      "choreData",
      JSON.stringify({ chores: updatedChores })
    );
  }
};

// Save new time to file, this version is for chores with units
export const createNewChore = (
  choreName: string,
  unitOfMeasurement: string,
  unitsPerSecond: string
) => {
  const stored = localStorage.getItem("choreData");
  const choreData = stored ? JSON.parse(stored) : null;
  console.log(choreData);

  const newChore: choreRacerType = {
    choreName: choreName,
    unitOfMeasurement: unitOfMeasurement,
    unitsPerSecond: unitsPerSecond,
    previous: {
      units: unitOfMeasurement === "None" ? 0 : 1,
      time: 99999,
    },
    best: {
      units: unitOfMeasurement === "None" ? 0 : 1,
      time: 99999,
    },
  };

  if (choreData) {
    const updatedChores: choreRacerType[] = [...choreData.chores, newChore];

    localStorage.setItem(
      "choreData",
      JSON.stringify({ chores: updatedChores })
    );
  }
};
