import * as React from "react";

import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import CloseIcon from "@mui/icons-material/Close";

import { pomoValuesType, SettingsMenuProps } from "./types";

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  open,
  handleClose,
  savedValue,
  setSavedValue,
  ...props
}) => {
  const [value, setValue] = React.useState<pomoValuesType>(savedValue);
  const [errors, setErrors] = React.useState<pomoValuesType>({
    pomoLength: "",
    smolRestLength: "",
    longRestLength: "",
    longRestCount: "",
  });

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

    if (name !== "longRestCount")
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(1, 120, value),
      }));
    else
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(0, 999, value),
      }));
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    if (!!errors[name]) {
      setValue((prev) => ({
        ...prev,
        [name]: savedValue[name],
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleReset = () => {
    setValue({
      pomoLength: "25",
      smolRestLength: "5",
      longRestLength: "15",
      longRestCount: "4",
    });
    setSavedValue(value);
  };

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
      <DialogContent dividers style={{ paddingBottom: "0px" }}>
        <Grid container>
          <Grid size={6}>
            <TextField
              required
              label="Pomodoro Length"
              type="number"
              name="pomoLength"
              variant="outlined"
              value={value.pomoLength}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.pomoLength}
              helperText={errors.pomoLength ? errors.pomoLength : " "}
            />
          </Grid>
          <Grid size={5}>
            <TextField
              required
              label="Short Rest Length"
              type="number"
              name="smolRestLength"
              variant="outlined"
              value={value.smolRestLength}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.smolRestLength}
              helperText={errors.smolRestLength}
            />
          </Grid>
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
          <Grid size={6} style={{ paddingTop: "10px" }}>
            <TextField
              required
              label="Long Rest Length"
              type="number"
              name="longRestLength"
              variant="outlined"
              value={value.longRestLength}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.longRestLength}
              helperText={errors.longRestLength ? errors.longRestLength : " "}
            />
          </Grid>
          <Grid size={5} style={{ paddingTop: "10px" }}>
            <TextField
              required
              label="Long Rest Count"
              type="number"
              name="longRestCount"
              variant="outlined"
              value={value.longRestCount}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.longRestCount}
              helperText={errors.longRestCount}
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
          Save and Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SettingsMenu;
