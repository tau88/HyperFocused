import React from "react";
import { useNavigate } from "react-router";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import SyncAltTwoToneIcon from "@mui/icons-material/SyncAltTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

import SettingsMenu from "./SettingsMenu";
import { TimeTranToolProps, timeUnit } from "./types";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const TimeTranTool: React.FC<TimeTranToolProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const handleNav_Home = () => {
    navigate("/");
  };

  const loadedTimeUnits = [
    { name: "Seconds", value: 1, favorited: true },
    { name: "Minutes", value: 60, favorited: false },
    { name: "Hours", value: 3600, favorited: false },
    { name: "Days", value: 86400, favorited: false },
    { name: "Microcentury", value: 3155.7, favorited: false },
    { name: "Nanocentury", value: 3.156, favorited: false },
    { name: "Sacaramucci", value: 950400, favorited: false },
    { name: "Showers", value: 480, favorited: false },
    { name: "Walked Miles", value: 1020, favorited: false },
    { name: "Songs", value: 180, favorited: false },
  ];
  const initialTimeUnits = loadedTimeUnits.reduce((acc, unit) => {
    const key = unit.name.toLowerCase();
    acc[key] = unit;
    return acc;
  }, {} as Record<string, timeUnit>);

  const [timeUnitList, setTimeUnitList] =
    React.useState<Record<string, timeUnit>>(initialTimeUnits);

  // Function to toggle the "favorited" status of a time unit
  const toggleTimeFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: string
  ) => {
    event.stopPropagation();

    //Toggle favorited status
    const tempRecordTimeUnitList = { ...timeUnitList };
    tempRecordTimeUnitList[key] = {
      ...tempRecordTimeUnitList[key],
      favorited: !tempRecordTimeUnitList[key].favorited,
    };

    //Once favorite updated, convert records to array for sorting favorites to the top
    const tempFlatTimeUnitList = Object.values(tempRecordTimeUnitList);
    tempFlatTimeUnitList.sort(
      (a, b) => Number(b.favorited) - Number(a.favorited)
    );

    //Convert back to a record for the useState (which takes records, not arrays)
    const finalRecordTimeUnitList = tempFlatTimeUnitList.reduce((acc, unit) => {
      const key = unit.name.toLowerCase();
      acc[key] = unit;
      return acc;
    }, {} as Record<string, timeUnit>);

    //Save change to useState
    setTimeUnitList(finalRecordTimeUnitList);
  };

  const [input, setInput] = React.useState("1");
  const [output, setOutput] = React.useState("60");
  const [unitOne, setUnitOne] = React.useState("Minutes");
  const [unitTwo, setUnitTwo] = React.useState("Seconds");

  const [settingsMenu, setSettingsMenu] = React.useState<null | HTMLElement>(
    null
  );

  React.useEffect(() => {
    var timeRatioTempOne = 60;
    var timeRatioTempTwo = 1;

    const recordSearchOne = Object.values(timeUnitList).find(
      (item) => item.name === unitOne
    );
    timeRatioTempOne = recordSearchOne ? recordSearchOne.value : 1;

    const recordSearchTwo = Object.values(timeUnitList).find(
      (item) => item.name === unitTwo
    );
    timeRatioTempTwo = recordSearchTwo ? recordSearchTwo.value : 1;

    const tempOutput = (Number(input) / timeRatioTempTwo) * timeRatioTempOne;

    setOutput(String(tempOutput));
  }, [input, timeUnitList, unitOne, unitTwo]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setInput(value);
    }
  };

  const handleChangeUnitOne = (event: SelectChangeEvent) => {
    setUnitOne(event.target.value);
  };

  const handleChangeUnitTwo = (event: SelectChangeEvent) => {
    setUnitTwo(event.target.value);
  };

  const handleSwitchUnits = () => {
    setInput(output);
    const temp = unitOne;
    setUnitOne(unitTwo);
    setUnitTwo(temp);
  };

  const handleSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenu(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setSettingsMenu(null);
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
              <b>Time Translator Tool</b>
            </Typography>
            <div>
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
                savedValue={timeUnitList}
                setSavedValue={setTimeUnitList}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ padding: "40px" }}>
          <Grid
            container
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Grid size={5}>
              <TextField
                variant="outlined"
                value={input}
                onChange={handleChangeInput}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "25px",
                  },
                }}
              />
            </Grid>
            <Grid size={2}>
              <SyncAltTwoToneIcon
                data-testid={"SyncAltTwoToneIcon"}
                color="secondary"
                style={{ fontSize: "60px" }}
                onClick={handleSwitchUnits}
                sx={{ cursor: "pointer" }}
              />
            </Grid>
            <Grid size={5}>
              <TextField
                disabled
                variant="outlined"
                value={output}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "25px",
                  },
                }}
              />
            </Grid>
          </Grid>
          <div style={{ paddingTop: "20px" }} />
          <Grid
            container
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Grid size={5}>
              <Select
                value={unitOne}
                data-testid={"dropdown"}
                onChange={handleChangeUnitOne}
                fullWidth
                inputProps={{ "aria-label": "Without label" }}
                renderValue={(value) => value}
              >
                {Object.entries(timeUnitList).map(([key, timeUnit]) => (
                  <MenuItem value={timeUnit.name} key={key}>
                    {timeUnit.favorited ? (
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => toggleTimeFavorite(e, key)}
                      >
                        <FavoriteIcon sx={{ color: pink[500] }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => toggleTimeFavorite(e, key)}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    )}
                    <div style={{ paddingLeft: "10px" }} />
                    {timeUnit.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={2} />
            <Grid size={5}>
              <Select
                value={unitTwo}
                onChange={handleChangeUnitTwo}
                fullWidth
                inputProps={{ "aria-label": "Without label" }}
                renderValue={(value) => value}
              >
                {Object.entries(timeUnitList).map(([key, timeUnit]) => (
                  <MenuItem value={timeUnit.name} key={key}>
                    {timeUnit.favorited ? (
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => toggleTimeFavorite(e, key)}
                      >
                        <FavoriteIcon sx={{ color: pink[500] }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => toggleTimeFavorite(e, key)}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    )}
                    <div style={{ paddingLeft: "10px" }} />
                    {timeUnit.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TimeTranTool;
