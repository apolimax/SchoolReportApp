import { render, screen } from "../test-utils";

import Home from "../pages/Home";

jest.mock("../components/ReportForm", () => {
  return () => <div>Mocked Report Form</div>;
});

describe("Home", () => {
  test("should render correctly", () => {
    render(<Home />);
    const list = screen.getByRole("list");
    const listItem = screen.getAllByRole("listitem");
    const reportForm = screen.getByText("Mocked Report Form");

    expect(list).toBeInTheDocument();
    expect(listItem).toHaveLength(2);
    expect(reportForm).toBeInTheDocument();
  });
});
