import { GridColDef } from "@mui/x-data-grid";

export type TimeTranToolProps = {};

export type timeTranValuesType = { [key: string]: string };

export type timeUnit = {
  name: string;
  value: number;
  favorited: boolean;
};

export const initialTimeUnits: Record<string, timeUnit> = {
  seconds: { name: "Seconds", value: 1, favorited: true },
  minutes: { name: "Minutes", value: 60, favorited: false },
  hours: { name: "Hours", value: 3600, favorited: false },
  days: { name: "Days", value: 86400, favorited: false },
  microcentury: { name: "Microcentury", value: 3155.7, favorited: false },
  nanocentury: { name: "Nanocentury", value: 3.156, favorited: false },
  sacaramucci: { name: "Sacaramucci", value: 950400, favorited: false },
  showers: { name: "Showers", value: 480, favorited: false },
  mileswalk: { name: "Walked Miles", value: 1020, favorited: false },
  songs: { name: "Songs", value: 180, favorited: false },
} as const;

export type SettingsMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  /** Saved values for translator settings */
  savedValue: Record<string, timeUnit>;
  /** Set saved values for time translator settings */
  setSavedValue: React.Dispatch<React.SetStateAction<Record<string, timeUnit>>>;
  /** Add a new values for translator settings */
  addTimeUnit: (key: string, value: number) => void;
};

export type timeUnitTableProps = {
  favorited: boolean;
  name: string;
  value: number;
};

export const columns: GridColDef[] = [
  { field: "favorite", headerName: "fav", width: 50 },
  { field: "name", headerName: "Time Unit", width: 200 },
  { field: "value", headerName: "Seconds", width: 120 },
];
