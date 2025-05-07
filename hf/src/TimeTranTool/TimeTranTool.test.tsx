import { render, screen } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

import TimeTranTool from "./TestTimeTranTool";
import HomePage from "../HomePage";

describe("< TimeTranTool />", () => {
  describe("Visual Elements", () => {
    test("should show the Chore Racer tool", () => {
      render(
        <MemoryRouter>
          <TimeTranTool />
        </MemoryRouter>
      );

      expect(screen.getByText("Time Translator Tool")).toBeInTheDocument();

      const inputBox = screen.getAllByRole("textbox")[0];
      expect(inputBox).toHaveValue("1");
    });
  });

  describe("App Bar", () => {
    test("should show the app bar", () => {
      render(
        <MemoryRouter>
          <TimeTranTool />
        </MemoryRouter>
      );

      expect(screen.getByTestId("HomeTwoToneIcon")).toBeInTheDocument();
      expect(screen.getByTestId("SettingsTwoToneIcon")).toBeInTheDocument();
    });

    test("app bar home button returns home", async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/time_translator_tool"]}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/time_translator_tool" element={<TimeTranTool />} />
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
          <TimeTranTool />
        </MemoryRouter>
      );

      const icon = screen.getByTestId("SettingsTwoToneIcon");
      await user.click(icon);

      expect(await screen.findByText("Save and Exit")).toBeInTheDocument();
    });
  });

  describe("Tool Functionality", () => {
    test("clicking the swap should switch values", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <TimeTranTool />
        </MemoryRouter>
      );

      const inputBox = screen.getAllByRole("textbox")[0];
      expect(inputBox).toHaveValue("1");

      const icon = screen.getByTestId("SyncAltTwoToneIcon");
      await user.click(icon);

      expect(inputBox).toHaveValue("60");
    });

    test("typing into the input value should change the translated time", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <TimeTranTool />
        </MemoryRouter>
      );

      const inputBox = screen.getAllByRole("textbox")[0];
      const outputBox = screen.getAllByRole("textbox")[1];
      expect(inputBox).toHaveValue("1");
      expect(outputBox).toHaveValue("60");

      await user.clear(inputBox);
      await user.type(inputBox, "5");

      expect(inputBox).toHaveValue("5");
      expect(outputBox).toHaveValue("300");
    });

    // test("change time units with dropdown", async () => {
    //   const user = userEvent.setup();

    //   render(
    //     <MemoryRouter>
    //       <TimeTranTool />
    //     </MemoryRouter>
    //   );

    //   //     const dropdownButton = screen.getByTestId("dropdown");
    // });
  });
});
