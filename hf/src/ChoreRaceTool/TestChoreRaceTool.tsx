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

import RacerDisplay from "./RacerDisplay";
import SettingsMenu from "./SettingsMenu";
import { ChoreRaceToolProps, choreRacerType } from "./types";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const ChoreRaceTool: React.FC<ChoreRaceToolProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const handleNav_Home = () => {
    navigate("/");
  };

  const initialChoreList = [
    {
      choreName: "Folding Laundry",
      unitOfMeasurement: "Clothes Folded",
      unitsPerSecond: "Seconds / Fold",
      favorite: false,
      best: {
        units: 26,
        time: 421,
      },
      previous: {
        units: 33,
        time: 600,
      },
    },
    {
      choreName: "Washing Dishes",
      unitOfMeasurement: "Dishes Washed",
      unitsPerSecond: "Seconds / Dish",
      favorite: false,
      best: {
        units: 30,
        time: 1376,
      },
      previous: {
        units: 14,
        time: 712,
      },
    },
    {
      choreName: "Making the Bed",
      unitOfMeasurement: "None",
      unitsPerSecond: "None",
      favorite: false,
      best: {
        units: 0,
        time: 135,
      },
      previous: {
        units: 0,
        time: 135,
      },
    },
    {
      choreName: "CUSTOM: Sweeping and Mopping the Kitchen",
      unitOfMeasurement: "None",
      unitsPerSecond: "None",
      favorite: false,
      best: {
        units: 0,
        time: 319,
      },
      previous: {
        units: 0,
        time: 553,
      },
    },
    {
      choreName: "CUSTOM: Water the Plants",
      unitOfMeasurement: "None",
      unitsPerSecond: "None",
      favorite: false,
      best: {
        units: 0,
        time: 54,
      },
      previous: {
        units: 0,
        time: 62,
      },
    },
  ];

  const [currentChore, setCurrentChore] = React.useState<choreRacerType>(
    initialChoreList[0]
  );

  const [savedChoreList, setSavedChoreList] =
    React.useState<choreRacerType[]>(initialChoreList);

  React.useEffect(() => {
    const updatedChore = savedChoreList.find(
      (chore) => chore.choreName === currentChore.choreName
    );

    if (updatedChore) {
      setCurrentChore(updatedChore);
    } else setCurrentChore(initialChoreList[0]);
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
                data-testid={"HomeTwoToneIcon"}
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
                data-testid={"SettingsTwoToneIcon"}
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
          data-testid={"dropdown"}
          value={
            currentChore.choreName === "None" ? "" : currentChore.choreName
          }
          onChange={handleChangeChore}
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
