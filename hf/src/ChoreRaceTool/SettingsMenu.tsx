import React from "react";

import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CloseIcon from "@mui/icons-material/Close";

import NewChoreMenu from "./NewChoreMenu";
import { SettingsMenuProps, choreRacerType } from "./types";

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  open,
  handleClose,
  savedChoreList,
  setSavedChoreList,

  ...props
}) => {
  const [value, setValue] = React.useState<choreRacerType[]>(savedChoreList);
  const [addChoreMenu, setAddChoreMenu] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseNoSave = () => {
    setValue(savedChoreList);
    handleClose();
  };

  const handleCloseSave = () => {
    setSavedChoreList(value);
    handleClose();
  };

  const handleOpenNewChoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAddChoreMenu(event.currentTarget);
  };

  const handleCloseNewChoreMenu = () => {
    setAddChoreMenu(null);
  };

  const handleAddNewChore = () => {};

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
            <Paper sx={{ minWidth: "33vw" }}>
              <MenuList>
                {savedChoreList.map(function (item, i) {
                  return (
                    <MenuItem>
                      <ListItemIcon>
                        <FavoriteBorderIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{savedChoreList[i].choreName}</ListItemText>
                      <ListItemIcon>
                        <DeleteTwoToneIcon fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                  );
                })}
                <Divider />
                <MenuItem onClick={handleOpenNewChoreMenu}>
                  <ListItemIcon>
                    <AddTwoToneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add Custom Chore</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <NewChoreMenu
        open={Boolean(addChoreMenu)}
        handleClose={handleCloseNewChoreMenu}
        savedChoreList={savedChoreList}
        setSavedChoreList={setSavedChoreList}
      />
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
