import { GridColDef } from "@mui/x-data-grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import pink from "@mui/material/colors/pink";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { timeUnit } from "../types";

export type SettingsMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  /** Saved values for translator settings */
  savedValue: Record<string, timeUnit>;
  /** Set saved values for time translator settings */
  setSavedValue: React.Dispatch<React.SetStateAction<Record<string, timeUnit>>>;
};

export const columns: GridColDef[] = [
  { field: "name", headerName: "Time Unit", width: 180 },
  { field: "value", headerName: "Seconds", width: 110 },
  {
    field: "favorited",
    headerName: "",
    width: 50,
    renderCell: (params) => {
      return params.value ? (
        <FavoriteIcon sx={{ marginTop: "12px", color: pink[500] }} />
      ) : (
        <FavoriteBorderIcon sx={{ marginTop: "12px" }} />
      );
    },
  },
  {
    field: "delete",
    headerName: "",
    width: 50,
    renderCell: () => {
      return <DeleteTwoToneIcon sx={{ marginTop: "12px" }} />;
    },
  },
];

export type NewTimeUnitMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  rows: timeUnit[];
  setRows: React.Dispatch<React.SetStateAction<timeUnit[]>>;
};

export type DeleteTimeUnitMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  /** Number of time unit that might be deleted */
  id: number;
  rows: timeUnit[];
  setRows: React.Dispatch<React.SetStateAction<timeUnit[]>>;
};
