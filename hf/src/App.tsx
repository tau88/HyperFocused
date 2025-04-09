import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import PomodoroTool from "./PomodoroTool";
import TimeTranTool from "./TimeTranTool";
import ChoreRaceTool from "./ChoreRaceTool";
import initializeChoreData from "./ChoreRaceTool/initializeChoreData";

const App: React.FC = () => {
  initializeChoreData();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pomodoro_tool" element={<PomodoroTool />} />
        <Route path="/time_translator_tool" element={<TimeTranTool />} />
        <Route path="/chore_race_tool" element={<ChoreRaceTool />} />
        <Route
          path="/future_tool"
          element={
            <ErrorPage
              code={204}
              codeDesc="This tool is under construction! Come back later..."
            />
          }
        />
        <Route
          path="/error"
          element={
            <ErrorPage
              code={404}
              codeDesc="Oops! The page you're looking for doesn't exist."
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
