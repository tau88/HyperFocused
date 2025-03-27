import * as React from "react";

import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import CloseIcon from "@mui/icons-material/Close";

import { columns, SettingsMenuProps } from "./types";

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  open,
  handleClose,
  savedChoreList,
  setSavedChoreList,

  ...props
}) => {
  const [value, setValue] = React.useState<string[]>(savedChoreList);

  const [rows, setRows] = React.useState<string[]>(savedChoreList);

  const validateField = (lower: number, upper: number, value: string) => {
    if (isNaN(Number(value)) || value === "") {
      return "Numbers only!";
    } else if (Number(value) < lower) {
      return "Enter at least " + lower + "!";
    } else if (Number(value) > upper) {
      return "Enter less than " + upper + "!";
    } else {
      return "";
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setValue(savedChoreList);
  };

  const handleCloseNoSave = () => {
    setValue(savedChoreList);
    handleClose();
  };

  const handleCloseSave = () => {
    setSavedChoreList(value);
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
      <DialogContent dividers style={{ paddingBottom: "0px" }}>
        <Grid container>
          <Grid size={5}>
            <Paper sx={{ height: "50vh", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                sx={{ border: 0 }}
                hideFooterPagination
                hideFooter
              />
            </Paper>
          </Grid>
        </Grid>
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
