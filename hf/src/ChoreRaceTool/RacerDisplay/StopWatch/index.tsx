import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import CloseIcon from "@mui/icons-material/Close";

import Timer from "./Timer";
import ControlButtons from "./ControlButtons";
import {
  saveTrialDataUnits,
  saveTrialDataNoUnits,
  loadTrialData,
} from "../../ChoreRacerJSONManager";
import { StopWatchProps } from "./types";

const StopWatch: React.FC<StopWatchProps> = ({
  choreName,
  setSavedChoreList,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const [saveTimeMenu, setSaveTimeMenu] = React.useState<null | HTMLElement>(
    null
  );
  const [units, setUnits] = React.useState<number>(0);

  React.useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && isPaused === false) {
      interval = window.setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const handleFinish = (event: React.MouseEvent<HTMLElement>) => {
    setSaveTimeMenu(event.currentTarget);
    setIsActive(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setUnits(Number(value));
  };

  const handleCloseNoSave = () => {
    setSaveTimeMenu(null);
    setTime(0);
  };

  const handleCloseSave = () => {
    const timeInSec = time / 1000;

    if (units !== 0) {
      saveTrialDataUnits(choreName, timeInSec, units);
      setSavedChoreList(loadTrialData());
    } else saveTrialDataNoUnits(choreName, timeInSec);
    setSaveTimeMenu(null);
    setTime(0);
  };

  return (
    <div className="stop-watch">
      <Timer time={time} />
      <ControlButtons
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        handleFinish={handleFinish}
        active={isActive}
        isPaused={isPaused}
      />
      <Dialog
        onClose={handleCloseNoSave}
        aria-labelledby="customized-dialog-title"
        open={Boolean(saveTimeMenu)}
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
          <div style={{ marginTop: "-10px", marginBottom: "10px" }}>
            <h3>Congrats! You finished in {time / 1000} seconds!</h3>
            <TextField
              required
              label="Number of Items"
              type="number"
              name="units"
              variant="outlined"
              value={units}
              onChange={handleChange}
            />
          </div>
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
    </div>
  );
};

export default StopWatch;
