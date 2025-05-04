import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import TestHomePage from ".";

describe("< TablePagination />", () => {
  describe("Visual Elements", () => {
    test("should render home page correctly", () => {
      //   render(<TestHomePage />);
      //   //Correct header text
      //   expect(screen.getByText("Welcome to HyperFocused!")).toBeTruthy();
    });

    test("should render correct # of apps", () => {
      //   render(<TestHomePage />);
      //   expect(screen.getAllByRole("card")).toHaveLength(5);
    });
  });
});
