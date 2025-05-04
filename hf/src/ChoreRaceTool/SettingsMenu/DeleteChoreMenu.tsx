import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

import { DeleteChoreMenuProps } from "./types";
import { basicChore } from "../types";

const DeleteChoreMenu: React.FC<DeleteChoreMenuProps> = ({
  open,
  handleClose,
  choreName,
  currentChore,
  setCurrentChore,
  savedChoreList,
  setSavedChoreList,

  ...props
}) => {
  const handleCloseNoSave = () => {
    handleClose();
  };

  const handleCloseSave = () => {
    const tempVal = savedChoreList.filter(
      (chore) => chore.choreName !== choreName
    );

    if (currentChore.choreName === choreName) setCurrentChore(basicChore);

    setSavedChoreList(tempVal);

    handleClose();
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
          <b>Are You Sure You Would Like To Delete Chore:</b>
        </Typography>
        <Typography variant="h6">
          <i>{choreName}</i> ?
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
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          color="secondary"
          onClick={handleCloseSave}
        >
          Delete
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

export default DeleteChoreMenu;
