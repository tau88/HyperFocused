import React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
// import SyncAltTwoToneIcon from "@mui/icons-material/SyncAltTwoTone";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import RacerDisplay from "./RacerDisplay";
import SettingsMenu from "./SettingsMenu";
import { ChoreRaceToolProps, choreRacerType, initialChoreList } from "./types";
import theme from "./theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const ChoreRaceTool: React.FC<ChoreRaceToolProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const handleNav_Home = () => {
    navigate("/");
  };

  const [settingsMenu, setSettingsMenu] = React.useState<null | HTMLElement>(
    null
  );

  const [currentChore, setCurrentChore] = React.useState<choreRacerType>({
    choreName: "None",
    unitOfMeasurement: "None",
    unitsPerSecond: "None",
  });
  const [savedChoreList, setSavedChoreList] =
    React.useState<choreRacerType[]>(initialChoreList);

  const handleSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenu(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setSettingsMenu(null);
  };

  const handleChangeChore = (event: SelectChangeEvent) => {
    const name = event.target.value;

    const tempChore: choreRacerType | undefined = savedChoreList.find((i) => {
      return i.choreName === name;
    });

    if (tempChore !== undefined) setCurrentChore(tempChore);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          backgroundColor: theme.palette.background.default,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-label="delete" size="large">
              <HomeTwoToneIcon
                onClick={handleNav_Home}
                color="secondary"
                sx={{
                  fontSize: "36px",
                  cursor: "pointer",
                }}
              />
            </IconButton>
            <Typography
              color="secondary"
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <b>Chore Racer</b>
            </Typography>
            <div>
              <IconButton aria-label="delete" size="large">
                <SettingsTwoToneIcon
                  color="secondary"
                  sx={{
                    fontSize: "36px",
                    cursor: "pointer",
                  }}
                  onClick={handleSettingsMenu}
                />
              </IconButton>
              <SettingsMenu
                open={Boolean(settingsMenu)}
                handleClose={handleCloseSettingsMenu}
                savedChoreList={savedChoreList}
                setSavedChoreList={setSavedChoreList}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Select
          value={currentChore.choreName}
          onChange={handleChangeChore}
          inputProps={{ "aria-label": "Without label" }}
          renderValue={(value) => value}
          style={{ margin: "20px", width: "90vw" }}
        >
          {savedChoreList.map(function (item, i) {
            return <MenuItem value={item.choreName}>{item.choreName}</MenuItem>;
          })}
        </Select>
        {currentChore.choreName === "None" ? (
          ""
        ) : (
          <RacerDisplay currentChore={currentChore} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default ChoreRaceTool;
