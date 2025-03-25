import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import CloseIcon from "@mui/icons-material/Close";

import {
  timeUnitTableProps,
  SettingsMenuProps,
  timeUnit,
  columns,
  initialTimeUnits,
} from "./types";

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  open,
  handleClose,
  savedValue,
  setSavedValue,
  addTimeUnit,
  ...props
}) => {
  const [value, setValue] =
    React.useState<Record<string, timeUnit>>(savedValue);
  // const [errors, setErrors] = React.useState<Record<string, string>>({
  //   pomoLength: "",
  //   smolRestLength: "",
  //   longRestLength: "",
  //   longRestCount: "",
  // });

  // const validateField = (lower: number, upper: number, value: string) => {
  //   if (isNaN(Number(value)) || value === "") {
  //     return "Numbers only!";
  //   } else if (Number(value) < lower) {
  //     return "Enter at least " + lower + "!";
  //   } else if (Number(value) > upper) {
  //     return "Enter less than " + upper + "!";
  //   } else {
  //     return "";
  //   }
  // };

  const tempRows: timeUnitTableProps[] = Object.entries(initialTimeUnits).map(
    ([key, unit], index) => ({
      id: index,
      key,
      name: unit.name,
      value: unit.value,
      favorited: unit.favorited,
    })
  );

  const [rows, setRows] = React.useState<timeUnitTableProps[]>(tempRows);

  const handleCloseNoSave = () => {
    setValue(savedValue);
    handleClose();
  };

  const handleCloseSave = () => {
    setSavedValue(value);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleCloseNoSave}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Settings
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseNoSave}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[800],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Paper sx={{ height: "50vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ border: 0 }}
            hideFooterPagination
            hideFooter
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          color="secondary"
          onClick={handleCloseSave}
        >
          Save and Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SettingsMenu;
