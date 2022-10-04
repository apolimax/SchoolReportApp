import { render, screen } from "../test-utils";

import Navbar from "../components/Navbar";

describe("Navbar", () => {
  test("should render correctly", () => {
    render(<Navbar />);

    const heading = screen.getByRole("heading", { name: "School Report" });
    expect(heading).toBeInTheDocument();
  });
});
