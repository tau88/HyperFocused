import * as React from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import { NewTimeUnitMenuProps } from "./types";
import { timeUnit } from "../types";

const NewTimeUnitMenu: React.FC<NewTimeUnitMenuProps> = ({
  open,
  handleClose,
  rows,
  setRows,
  ...props
}) => {
  const emptyNewTimeUnit: timeUnit = {
    name: "",
    value: 1,
    favorited: false,
  };

  const [value, setValue] = React.useState<timeUnit>(emptyNewTimeUnit);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({
    name: "",
    value: "",
  });

  const handleCloseNoSave = () => {
    setValue(emptyNewTimeUnit);
    handleClose();
  };

  const handleCloseSave = () => {
    if (
      Object.values(errors).every((key) => key === null || key === "") &&
      !Object.values(value).some((key) => key === null || key === "")
    ) {
      setRows([...rows, { ...value, id: rows.length }]);
      setValue(emptyNewTimeUnit);
      handleClose();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(name + " " + value);

    if (name === "value") {
      if (Number(value)! < 0) return;
    }

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value === "")
      setErrors((prev) => ({
        ...prev,
        [name]: "Cannot be Empty",
      }));
    else if (Number(value) === 0)
      setErrors((prev) => ({
        ...prev,
        [name]: "Cannot Divide by 0",
      }));
    else
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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
        <Grid
          container
          spacing={2}
          sx={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <Grid size={6}>
            <TextField
              fullWidth
              required
              label="Name of Unit"
              name="name"
              variant="outlined"
              value={value.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              required
              label="Seconds per Unit"
              name="value"
              variant="outlined"
              type="number"
              value={value.value}
              onChange={handleChange}
              error={!!errors.value}
              helperText={errors.value ? errors.value : " "}
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

export default NewTimeUnitMenu;
