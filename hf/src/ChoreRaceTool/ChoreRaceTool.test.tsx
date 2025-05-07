import { render, screen } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

import ChoreRaceTool from "./TestChoreRaceTool";
import HomePage from "../HomePage";

describe("< ChoreRaceTool />", () => {
  describe("Visual Elements", () => {
    test("should show the Chore Racer tool", () => {
      render(
        <MemoryRouter>
          <ChoreRaceTool />
        </MemoryRouter>
      );

      expect(screen.getByText("Chore Racer")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    });
  });

  describe("App Bar", () => {
    test("should show the app bar", () => {
      render(
        <MemoryRouter>
          <ChoreRaceTool />
        </MemoryRouter>
      );

      expect(screen.getByTestId("HomeTwoToneIcon")).toBeInTheDocument();
      expect(screen.getByTestId("SettingsTwoToneIcon")).toBeInTheDocument();
    });

    test("app bar home button returns home", async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/chore_race_tool"]}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chore_race_tool" element={<ChoreRaceTool />} />
          </Routes>
        </MemoryRouter>
      );

      const icon = screen.getByTestId("HomeTwoToneIcon");
      await user.click(icon);

      expect(
        await screen.findByText("Welcome to HyperFocused!")
      ).toBeInTheDocument();
    });

    test("app bar settings button opens settings", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <ChoreRaceTool />
        </MemoryRouter>
      );

      const icon = screen.getByTestId("SettingsTwoToneIcon");
      await user.click(icon);

      expect(await screen.findByText("Save and Exit")).toBeInTheDocument();
    });
  });

  describe("Tool Functionality", () => {
    //   test("clicking the dropdown should open dropdown", async () => {
    //     const user = userEvent.setup();
    //     render(
    //       <MemoryRouter>
    //         <ChoreRaceTool />
    //       </MemoryRouter>
    //     );
    //     expect(screen.queryByText("Folding Laundry")).toBeNull();
    //     const icon = screen.getByTestId("dropdown");
    //     await user.click(icon);
    //     expect(await screen.findByText("Folding Laundry")).toBeInTheDocument();
    //   });
    // test("clicking a chore in dropdown should close dropdown and open chore data", async () => {
    //     const user = userEvent.setup();
    //     render(
    //       <MemoryRouter>
    //         <ChoreRaceTool />
    //       </MemoryRouter>
    //     );
    //     expect(screen.queryByText("Folding Laundry")).toBeNull();
    //     const dropdownButton = screen.getByTestId("dropdown");
    //     await user.click(dropdownButton);
    // expect(await screen.findByText("Folding Laundry")).toBeInTheDocument();
    //     expect(await screen.findByText("Washing Dishes")).toBeInTheDocument();
    // const laundryButton = screen.getByText("Folding Laundry");
    //     await user.click(laundryButton);
    // expect(await screen.findByText("Washing Dishes")).toBeNull();
    // expect(screen.getByText("Personal Best")).toBeInTheDocument();
    // expect(screen.getByText("Clothes Folded")).toBeInTheDocument();
    // expect(screen.getByText("16.19")).toBeInTheDocument();
    // });
  });
});
