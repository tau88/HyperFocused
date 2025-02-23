import React from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid2";

import AlarmOnTwoToneIcon from "@mui/icons-material/AlarmOnTwoTone";
import BrowseGalleryTwoToneIcon from "@mui/icons-material/BrowseGalleryTwoTone";
import SportsScoreTwoToneIcon from "@mui/icons-material/SportsScoreTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import red from "@mui/material/colors/red";
import green from "@mui/material/colors/green";
import blue from "@mui/material/colors/blue";

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

  const handleNav_Dead = () => {
    navigate("/error");
  };

  const pomoIcon = () => (
    <AlarmOnTwoToneIcon
      onClick={handleNav_Pomo}
      sx={{ fontSize: "7vw", color: red[400], cursor: "pointer" }}
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

  const examIcon = () => (
    <CheckBoxOutlineBlankTwoToneIcon
      onClick={handleNav_Dead}
      sx={{ fontSize: "7vw", color: blue[800], cursor: "pointer" }}
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
              title="Example Tool"
              desc="Placeholder to see how the second row looks."
              Icon={examIcon}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
