import React from "react";

import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";

import { NewChoreMenuProps } from "./types";
import { choreRacerType } from "../types";

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

  const [value, setValue] = React.useState<choreRacerType>(emptyNewChore);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({
    choreName: "",
    unitOfMeasurement: "",
    unitsPerSecond: "",
  });

  const handleCloseNoSave = () => {
    setValue(emptyNewChore);
    handleClose();
  };

  const handleCloseSave = () => {
    if (value.unitOfMeasurement === "None")
      setValue((prev) => ({
        ...prev,
        units: 0,
      }));
    setSavedChoreList([...savedChoreList, value]);
    handleClose();
  };

  const handleReset = () => {
    setValue(emptyNewChore);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name + " " + value);

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.length === 0)
      setErrors((prev) => ({
        ...prev,
        [name]: "Field cannot be empty",
      }));
    else
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

    // setErrors()

    // if (name !== "longRestCount")
    //   setErrors((prev) => ({
    //     ...prev,
    //     [name]: validateField(1, 120, value),
    //   }));
    // else
    //   setErrors((prev) => ({
    //     ...prev,
    //     [name]: validateField(0, 999, value),
    //   }));
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
        <Typography variant="h5">
          <b>Add a New Chore:</b>
        </Typography>
        <Typography variant="caption">
          Enter None if chore doesn't have units
        </Typography>
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
              error={!!errors.choreName}
              helperText={errors.choreName ? errors.choreName : " "}
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
              error={!!errors.unitOfMeasurement}
              helperText={
                errors.unitOfMeasurement ? errors.unitOfMeasurement : " "
              }
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
              error={!!errors.unitsPerSecond}
              helperText={errors.unitsPerSecond ? errors.unitsPerSecond : " "}
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
