import React from "react";
import { Routes, Route, MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import TestHomePage from ".";
import PomodoroTool from "../PomodoroTool";
import ErrorPage from "../ErrorPage";

describe("< HomePage />", () => {
  describe("Visual Elements", () => {
    test("should render home page correctly", () => {
      render(
        <MemoryRouter>
          <TestHomePage />
        </MemoryRouter>
      );
      //Correct header text
      expect(screen.getByText("Welcome to HyperFocused!")).toBeTruthy();
    });

    test("should render correct # of apps", () => {
      render(
        <MemoryRouter>
          <TestHomePage />
        </MemoryRouter>
      );
      //There are 15 buttons, 3 per app (5) - 3 * 5 = 15
      expect(screen.getAllByRole("button")).toHaveLength(15);
    });
  });

  describe("Cursor Navigation", () => {
    test("clicking on the favorite icon hearts the tool", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <TestHomePage />
        </MemoryRouter>
      );

      const icon = screen.getAllByTestId("expand-button")[0];
      await user.click(icon);

      expect(
        await screen.findByText(
          "The Pomodoro Technique is a time management method to break work into intervals."
        )
      ).toBeInTheDocument();
    });

    test("clicking an icon navigates away from the Home Page", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<TestHomePage />} />
            <Route path="/pomodoro_tool" element={<PomodoroTool />} />
          </Routes>
        </MemoryRouter>
      );

      const icon = screen.getByTestId("pomo-icon");
      await user.click(icon);

      expect(
        await screen.findByText("Current Phase: Pomodoro")
      ).toBeInTheDocument();
    });

    test("clicking the error icon navigates to the Error Page", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<TestHomePage />} />
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
        </MemoryRouter>
      );

      const icon = screen.getByTestId("error-icon");
      await user.click(icon);

      expect(
        await screen.findByText(
          "Oops! The page you're looking for doesn't exist."
        )
      ).toBeInTheDocument();
    });
  });
});
