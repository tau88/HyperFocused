import { render, screen } from "@testing-library/react";
import App from "./App";

test("should show the home page when navigated", () => {
  render(<App />);

  expect(screen.getByText("Welcome to HyperFocused!")).toBeInTheDocument();
});
