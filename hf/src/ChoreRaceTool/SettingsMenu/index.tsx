import React from "react";

import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
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
import pink from "@mui/material/colors/pink";

import NewChoreMenu from "./NewChoreMenu";
import DeleteChoreMenu from "./DeleteChoreMenu";
import { saveChoreMenu } from "../ChoreRacerJSONManager";
import { SettingsMenuProps } from "../types";

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  open,
  handleClose,
  savedChoreList,
  setSavedChoreList,

  ...props
}) => {
  const [addChoreMenu, setAddChoreMenu] = React.useState<null | HTMLElement>(
    null
  );
  const [deleteChoreMenu, setDeleteChoreMenu] =
    React.useState<null | HTMLElement>(null);
  const [selectedChore, setSelectedChore] = React.useState<string>("");

  const [tempChoreList, setTempChoreList] = React.useState([...savedChoreList]);
  React.useEffect(() => {
    if (open) {
      setTempChoreList([...savedChoreList]); // fresh copy each time dialog opens
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleCloseNoSave = () => {
    handleClose();
  };

  const handleCloseSave = () => {
    setSavedChoreList(tempChoreList);
    saveChoreMenu(tempChoreList);
    handleClose();
  };

  const handleOpenNewChoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAddChoreMenu(event.currentTarget);
  };

  const handleCloseNewChoreMenu = () => {
    setAddChoreMenu(null);
  };

  const handleOpenDeleteChoreMenu = (
    event: React.MouseEvent<HTMLElement>,
    choreName: string
  ) => {
    setSelectedChore(choreName);
    setDeleteChoreMenu(event.currentTarget);
  };

  const handleCloseDeleteChoreMenu = () => {
    setDeleteChoreMenu(null);
  };

  // Function to toggle the "favorited" status of a time unit
  const toggleChoreFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number
  ) => {
    event.stopPropagation();

    const tempVal = [...tempChoreList];
    tempVal[i] = { ...tempVal[i], favorite: !tempVal[i].favorite };

    setTempChoreList(tempVal);
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
        <Grid container>
          <Grid>
            <Paper>
              <MenuList>
                {tempChoreList.map(function (item, i) {
                  return (
                    <MenuItem>
                      <ListItemIcon>
                        {tempChoreList[i].favorite ? (
                          <FavoriteIcon
                            onClick={(
                              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                            ) => toggleChoreFavorite(e, i)}
                            sx={{ color: pink[500] }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            onClick={(
                              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                            ) => toggleChoreFavorite(e, i)}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText>{tempChoreList[i].choreName}</ListItemText>
                      <ListItemIcon
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) =>
                          handleOpenDeleteChoreMenu(
                            e,
                            tempChoreList[i].choreName
                          )
                        }
                      >
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
      <NewChoreMenu
        open={Boolean(addChoreMenu)}
        handleClose={handleCloseNewChoreMenu}
        savedChoreList={tempChoreList}
        setSavedChoreList={setTempChoreList}
      />
      <DeleteChoreMenu
        open={Boolean(deleteChoreMenu)}
        handleClose={handleCloseDeleteChoreMenu}
        choreName={selectedChore}
        savedChoreList={tempChoreList}
        setSavedChoreList={setTempChoreList}
      />
    </Dialog>
  );
};
export default SettingsMenu;
