import React from "react";
import { useNavigate } from "react-router";

import { Grid } from "@mui/material";

import AlarmOnTwoToneIcon from "@mui/icons-material/AlarmOnTwoTone";
import BrowseGalleryTwoToneIcon from "@mui/icons-material/BrowseGalleryTwoTone";
import SportsScoreTwoToneIcon from "@mui/icons-material/SportsScoreTwoTone";
import ConstructionTwoToneIcon from "@mui/icons-material/ConstructionTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import { red, green, blue, yellow } from "@mui/material/colors";

import ToolIconTemplate from "./ToolIconTemplate";
import { HomePageProps } from "./types";

const HomePage: React.FC<HomePageProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const handleNav_Pomo = () => {
    navigate("/pomodoro_tool");
  };

  const handleNav_Time_Translator = () => {
    navigate("/time_translator_tool");
  };

  const handleNav_Race = () => {
    navigate("/chore_race_tool");
  };

  const handleNav_New_Tool = () => {
    navigate("/future_tool");
  };

  const handleNav_Dead = () => {
    navigate("/error");
  };

  const pomoIcon = () => (
    <AlarmOnTwoToneIcon
      data-testid={"pomo-icon"}
      onClick={handleNav_Pomo}
      sx={{ fontSize: "7vw", color: blue[400], cursor: "pointer" }}
    />
  );

  const time_Translator_Icon = () => (
    <BrowseGalleryTwoToneIcon
      onClick={handleNav_Time_Translator}
      sx={{ fontSize: "7vw", color: green[700], cursor: "pointer" }}
    />
  );

  const raceIcon = () => (
    <SportsScoreTwoToneIcon
      onClick={handleNav_Race}
      sx={{ fontSize: "7vw", cursor: "pointer" }}
    />
  );

  const construction_Icon = () => (
    <ConstructionTwoToneIcon
      onClick={handleNav_New_Tool}
      sx={{ fontSize: "7vw", color: yellow[800], cursor: "pointer" }}
    />
  );

  const examIcon = () => (
    <CheckBoxOutlineBlankTwoToneIcon
      data-testid={"error-icon"}
      onClick={handleNav_Dead}
      sx={{ fontSize: "7vw", color: red[800], cursor: "pointer" }}
    />
  );

  return (
    <div
      style={{ paddingLeft: "20px", paddingRight: "20px" }}
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4"
    >
      <h1
        style={{ marginBottom: "-10px" }}
        className="text-4xl font-bold text-gray-900"
      >
        Welcome to HyperFocused!
      </h1>
      <p>Tools for organization, keeping on task, and more!</p>

      <div
        style={{ paddingBottom: "10px" }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Grid container spacing={0} alignItems="top" justifyContent="left">
          <Grid sx={{ width: 1 / 4 }}>
            <ToolIconTemplate
              title="Pomodoro Tool"
              desc="The Pomodoro Technique is a time management method to break work into intervals."
              Icon={pomoIcon}
            />
          </Grid>
          <Grid sx={{ width: 1 / 4 }}>
            <ToolIconTemplate
              title="Time Translator"
              desc="Translate useless measurements of time to more understandable ones (or vice versa)."
              Icon={time_Translator_Icon}
            />
          </Grid>
          <Grid sx={{ width: 1 / 4 }}>
            <ToolIconTemplate
              title="Chore Racer"
              desc="Compete against yourself with a tool that transforms chores into exciting contests."
              Icon={raceIcon}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          alignItems="top"
          justifyContent="left"
          style={{ paddingTop: "20px" }}
        >
          <Grid sx={{ width: 1 / 4 }}>
            <ToolIconTemplate
              title="Future Tool"
              desc="Placeholder to see how a unfinished tool works and how the second row looks."
              Icon={construction_Icon}
            />
          </Grid>
          <Grid sx={{ width: 1 / 4 }}>
            <ToolIconTemplate
              title="Example Tool"
              desc="Placeholder to see how the home page handles errors and how the second row looks."
              Icon={examIcon}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
