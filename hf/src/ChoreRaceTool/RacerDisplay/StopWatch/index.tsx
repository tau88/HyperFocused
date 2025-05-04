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
import { saveChoreMenu } from "../../ChoreRacerJSONManager";
import { StopWatchProps } from "./types";

const StopWatch: React.FC<StopWatchProps> = ({
  choreName,
  savedChoreList,
  setSavedChoreList,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const [saveTimeMenu, setSaveTimeMenu] = React.useState<null | HTMLElement>(
    null
  );
  const [units, setUnits] = React.useState<number>(1);

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
    const unitcount = Number(value);

    if (unitcount > 0) {
      setUnits(unitcount);
    }
  };

  const handleCloseNoSave = () => {
    setSaveTimeMenu(null);
  };

  const handleCloseSave = () => {
    const timeInSec = time / 1000;
    const tempChoreList = [...savedChoreList];
    const i = tempChoreList.findIndex((chore) => {
      return chore.choreName === choreName;
    });

    if (tempChoreList[i].unitOfMeasurement !== "None") {
      const pastBestRatio =
        tempChoreList[i].best.time / tempChoreList[i].best.units;
      const currentRatio = timeInSec / units;

      if (currentRatio < pastBestRatio)
        tempChoreList[i] = {
          ...tempChoreList[i],
          best: { units: units, time: timeInSec },
          previous: { units: units, time: timeInSec },
        };
      else
        tempChoreList[i] = {
          ...tempChoreList[i],
          previous: { units: units, time: timeInSec },
        };
    } else {
      if (timeInSec < tempChoreList[i].best.time)
        tempChoreList[i] = {
          ...tempChoreList[i],
          best: { units: 0, time: timeInSec },
          previous: { units: 0, time: timeInSec },
        };
      else
        tempChoreList[i] = {
          ...tempChoreList[i],
          previous: { units: 0, time: timeInSec },
        };
    }

    saveChoreMenu(tempChoreList);
    setSavedChoreList(tempChoreList);

    setSaveTimeMenu(null);
    setTime(0);
    setUnits(1);
  };

  const i = savedChoreList.findIndex((chore) => {
    return chore.choreName === choreName;
  });

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
        <DialogTitle sx={{ paddingBottom: "8px" }} id="customized-dialog-title">
          Chore Complete!
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
          <div style={{ marginTop: "-25px", marginBottom: "10px" }}>
            <h3>Congrats! You finished in {time / 1000} seconds!</h3>
            {savedChoreList[i].unitOfMeasurement === "None" ? (
              ""
            ) : (
              <TextField
                required
                label="Number of Items"
                type="number"
                name="units"
                variant="outlined"
                value={units}
                onChange={handleChange}
              />
            )}
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
    </div>
  );
};

export default StopWatch;
