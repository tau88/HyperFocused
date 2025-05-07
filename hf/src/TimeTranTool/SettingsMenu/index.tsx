import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import NewTimeUnitMenu from "./NewTimeUnitMenu";
import DeleteTimeUnitMenu from "./DeleteTimeUnitMenu";
import { saveTimeUnitMenu } from "../TimeTranJSONManager";
import { SettingsMenuProps, columns } from "./types";
import { timeUnit } from "../types";

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  open,
  handleClose,
  savedValue,
  setSavedValue,
  ...props
}) => {
  const [id, setId] = React.useState<number>(0);

  const tempRows: timeUnit[] = Object.entries(savedValue).map(
    ([key, unit], index) => ({
      id: index,
      key,
      favorited: unit.favorited,
      name: unit.name,
      value: unit.value,
    })
  );

  const [rows, setRows] = React.useState<timeUnit[]>(tempRows);

  const [addTimeUnitMenu, setAddTimeUnitMenu] =
    React.useState<null | HTMLElement>(null);
  const [deleteTimeUnitMenu, setDeleteTimeUnitMenu] =
    React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      setRows(
        Object.entries(savedValue).map(([key, unit], index) => ({
          id: index,
          key,
          favorited: unit.favorited,
          name: unit.name,
          value: unit.value,
        }))
      ); //create a fresh copy of the rows each time dialog opens (to update order of rows with favoriting)
    }
  }, [open, savedValue]);

  const handleCloseNoSave = () => {
    setRows(tempRows);
    handleClose();
  };

  const handleCloseSave = () => {
    const recordRows = rows.reduce((acc, unit) => {
      const key = unit.name.toLowerCase();
      acc[key] = unit;
      return acc;
    }, {} as Record<string, timeUnit>);

    setSavedValue(recordRows);
    saveTimeUnitMenu(rows);
    handleClose();
  };

  const handleOpenNewTimeUnitMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAddTimeUnitMenu(event.currentTarget);
  };

  const handleCloseNewTimeUnitMenu = () => {
    setAddTimeUnitMenu(null);
  };

  const handleOpenDeleteTimeUnitMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setDeleteTimeUnitMenu(event.currentTarget);
  };

  const handleCloseDeleteTimeUnitMenu = () => {
    setDeleteTimeUnitMenu(null);
  };

  const handleOnCellClick = (
    event: React.MouseEvent<HTMLElement>,
    params: any
  ) => {
    if (params.field === "delete") {
      //When clicking the trash icon, open delete time unit menu
      setId(params.row.id);
      handleOpenDeleteTimeUnitMenu(event);
    } else if (params.field === "favorited") {
      //When clicking the heart icon, toggle the favorite status of the time unit
      const favoriteFlip = [...rows];
      favoriteFlip[params.row.id] = {
        ...favoriteFlip[params.row.id],
        favorited: !params.row.favorited,
      };
      favoriteFlip.sort((a, b) => Number(b.favorited) - Number(a.favorited));
      setRows(favoriteFlip);
    }
    // console.log(params);
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
        <Paper sx={{ height: "50vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ border: 0 }}
            onCellClick={(param, event) => handleOnCellClick(event, param)}
            hideFooterPagination
            hideFooter
          />
        </Paper>
        <Divider />
        <MenuItem onClick={handleOpenNewTimeUnitMenu}>
          <ListItemIcon>
            <AddTwoToneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Custom Chore</ListItemText>
        </MenuItem>
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
      <NewTimeUnitMenu
        open={Boolean(addTimeUnitMenu)}
        handleClose={handleCloseNewTimeUnitMenu}
        rows={rows}
        setRows={setRows}
      />
      <DeleteTimeUnitMenu
        open={Boolean(deleteTimeUnitMenu)}
        handleClose={handleCloseDeleteTimeUnitMenu}
        id={id}
        rows={rows}
        setRows={setRows}
      />
    </Dialog>
  );
};
export default SettingsMenu;
