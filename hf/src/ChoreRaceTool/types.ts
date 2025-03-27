import { GridColDef } from "@mui/x-data-grid";

export type ChoreRaceToolProps = {};

export type choreTableProps = {
  name: string;
};

export const columns: GridColDef[] = [
  { field: "favorite", headerName: "fav", width: 50 },
  { field: "name", headerName: "Time Unit", width: 200 },
  { field: "value", headerName: "Seconds", width: 120 },
];

export type SettingsMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  /** Saved values for pomodoro settings */
  savedChoreList: string[];
  /** Set saved values for pomodoro settings */
  setSavedChoreList: React.Dispatch<React.SetStateAction<string[]>>;
};
