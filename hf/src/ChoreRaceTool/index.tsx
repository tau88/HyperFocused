import React from "react";
import { useNavigate } from "react-router";

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

import { loadTrialData } from "./ChoreRacerJSONManager";
import RacerDisplay from "./RacerDisplay";
import SettingsMenu from "./SettingsMenu";
import { ChoreRaceToolProps, choreRacerType, basicChore } from "./types";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const ChoreRaceTool: React.FC<ChoreRaceToolProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const handleNav_Home = () => {
    navigate("/");
  };

  const [currentChore, setCurrentChore] =
    React.useState<choreRacerType>(basicChore);

  const initialChoreList = loadTrialData();

  const [savedChoreList, setSavedChoreList] =
    React.useState<choreRacerType[]>(initialChoreList);

  React.useEffect(() => {
    const updatedChore = savedChoreList.find(
      (chore) => chore.choreName === currentChore.choreName
    );

    if (updatedChore) {
      setCurrentChore(updatedChore);
    } else setCurrentChore(basicChore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChore.choreName, savedChoreList]);

  const [settingsMenu, setSettingsMenu] = React.useState<null | HTMLElement>(
    null
  );

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
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleSettingsMenu}
            >
              <SettingsTwoToneIcon
                color="secondary"
                sx={{
                  fontSize: "36px",
                  cursor: "pointer",
                }}
              />
            </IconButton>
            <SettingsMenu
              open={Boolean(settingsMenu)}
              handleClose={handleCloseSettingsMenu}
              currentChore={currentChore}
              setCurrentChore={setCurrentChore}
              savedChoreList={savedChoreList}
              setSavedChoreList={setSavedChoreList}
            />
          </Toolbar>
        </AppBar>
        <Select
          value={
            currentChore.choreName === "None" ? "" : currentChore.choreName
          }
          onChange={handleChangeChore}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          renderValue={(value) => value}
          style={{ margin: "20px", width: "90vw" }}
        >
          {savedChoreList.map(function (item, i) {
            return <MenuItem value={item.choreName}>{item.choreName}</MenuItem>;
          })}
        </Select>
        {currentChore.choreName === "None" &&
        currentChore.unitsPerSecond === "None" ? (
          ""
        ) : (
          <RacerDisplay
            currentChore={currentChore}
            savedChoreList={savedChoreList}
            setSavedChoreList={setSavedChoreList}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default ChoreRaceTool;
