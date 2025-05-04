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

export const basicChore: choreRacerType = {
  choreName: "None",
  unitOfMeasurement: "None",
  unitsPerSecond: "None",
  favorite: false,
  previous: {
    units: 1,
    time: 99999,
  },
  best: {
    units: 1,
    time: 99999,
  },
};
