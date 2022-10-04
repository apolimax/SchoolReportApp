import { render, screen } from "../test-utils";
import user from "@testing-library/user-event";

import Home from "../pages/Home";

describe("Home", () => {
  test("should render correctly", () => {
    render(<Home />);
  });
});
