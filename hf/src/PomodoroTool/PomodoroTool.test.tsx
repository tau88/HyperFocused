import { render, screen } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

import PomodoroTool from "./";
import HomePage from "../HomePage";

describe("< PomodoroTool />", () => {
  describe("Visual Elements", () => {
    test("should show the pomodoro tool", () => {
      render(
        <MemoryRouter>
          <PomodoroTool />
        </MemoryRouter>
      );

      expect(screen.getByText("Pomodoro Tool")).toBeInTheDocument();
      expect(screen.getByText("Current Phase: Pomodoro")).toBeInTheDocument();
    });
  });

  describe("App Bar", () => {
    test("should show the app bar", () => {
      render(
        <MemoryRouter>
          <PomodoroTool />
        </MemoryRouter>
      );

      expect(screen.getByTestId("home-button")).toBeInTheDocument();
      expect(screen.getByTestId("settings-button")).toBeInTheDocument();
    });

    test("app bar home button returns home", async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/pomodoro_tool"]}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pomodoro_tool" element={<PomodoroTool />} />
          </Routes>
        </MemoryRouter>
      );

      const icon = screen.getByTestId("home-button");
      await user.click(icon);

      expect(
        await screen.findByText("Welcome to HyperFocused!")
      ).toBeInTheDocument();
    });

    test("app bar settings button opens settings", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <PomodoroTool />
        </MemoryRouter>
      );

      const icon = screen.getByTestId("settings-button");
      await user.click(icon);

      expect(await screen.findByText("Save and Exit")).toBeInTheDocument();
    });
  });

  describe("Tool Functionality", () => {
    test("next pomo should go to the next the pomo", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <PomodoroTool />
        </MemoryRouter>
      );

      expect(screen.getByText("Current Phase: Pomodoro")).toBeInTheDocument();

      const icon = screen.getByTestId("next-pomo-button");
      await user.click(icon);
      expect(screen.getByText("Current Phase: Short")).toBeInTheDocument();

      await user.click(icon);
      expect(screen.getByText("Current Phase: Pomodoro")).toBeInTheDocument();
      expect(screen.getByText("Current pomos left: 3")).toBeInTheDocument();
    });

    test("reset pomo should return pomo rest count", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <PomodoroTool />
        </MemoryRouter>
      );

      const icon1 = screen.getByTestId("next-pomo-button");
      const icon2 = screen.getByTestId("reset-pomo-button");

      expect(screen.getByText("Current pomos left: 4")).toBeInTheDocument();
      //Click through 3 times to go to 2 pomos left -> pomo>short>pomo>short
      await user.click(icon1);
      await user.click(icon1);
      await user.click(icon1);
      expect(screen.getByText("Current pomos left: 2")).toBeInTheDocument();
      await user.click(icon2);
      expect(screen.getByText("Current pomos left: 4")).toBeInTheDocument();
    });

    test("a long rest should appear after 4 pomos", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <PomodoroTool />
        </MemoryRouter>
      );

      const icon = screen.getByTestId("next-pomo-button");

      expect(screen.getByText("Current pomos left: 4")).toBeInTheDocument();
      //Click through 7 times to go to 0 pomos left -> pomo>short>pomo>short...>pomo>long
      await user.click(icon);
      await user.click(icon);
      await user.click(icon);
      await user.click(icon);
      await user.click(icon);
      await user.click(icon);
      await user.click(icon);
      expect(screen.getByText("Current pomos left: 0")).toBeInTheDocument();
      expect(screen.getByText("15:00")).toBeInTheDocument();
    });

    test("start should start the timer", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <PomodoroTool />
        </MemoryRouter>
      );

      const startButton = screen.getByTestId("start-time-button");
      const stopButton = screen.getByRole("button", { name: /Stop/i });

      expect(stopButton).toBeDisabled();
      await user.click(startButton);
      expect(stopButton).toBeEnabled();
    });
  });
});
