import React from "react";

import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";

import { NewChoreMenuProps, choreRacerType } from "./types";

const NewChoreMenu: React.FC<NewChoreMenuProps> = ({
  open,
  handleClose,
  savedChoreList,
  setSavedChoreList,

  ...props
}) => {
  const emptyNewChore: choreRacerType = {
    choreName: "",
    unitOfMeasurement: "",
    unitsPerSecond: "",
  };

  const [value, setValue] = React.useState<choreRacerType>(emptyNewChore);

  const handleCloseNoSave = () => {
    setValue(emptyNewChore);
    handleClose();
  };

  const handleCloseSave = () => {
    setSavedChoreList([...savedChoreList, value]);
    handleClose();
  };

  const handleReset = () => {
    setValue(emptyNewChore);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      onClose={handleCloseNoSave}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add a New Chore
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
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              fullWidth
              required
              label="Chore Name"
              name="choreName"
              variant="outlined"
              value={value.choreName}
              onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={errors.pomoLength}
              //   helperText={errors.pomoLength ? errors.pomoLength : " "}
            />
          </Grid>
          <Grid size={5}></Grid>
          <Grid
            container
            item
            size={1}
            sx={{
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <IconButton
              aria-label="restore"
              onClick={handleReset}
              sx={(theme) => ({
                color: theme.palette.grey[800],
              })}
            >
              <RefreshTwoToneIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <Grid size={6}>
            <TextField
              fullWidth
              required
              label="Unit of Measurement"
              name="unitOfMeasurement"
              variant="outlined"
              value={value.unitOfMeasurement}
              onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={!!errors.smolRestLength}
              //   helperText={errors.smolRestLength}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              required
              label="Units per Second"
              name="unitsPerSecond"
              variant="outlined"
              value={value.unitsPerSecond}
              onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={!!errors.smolRestLength}
              //   helperText={errors.smolRestLength}
            />
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
          Add New Chore
        </Button>
        <Button
          autoFocus
          variant="contained"
          color="primary"
          onClick={handleCloseNoSave}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewChoreMenu;
