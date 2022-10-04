import { render, screen } from "../test-utils";
import user from "@testing-library/user-event";

import ReportForm from "../components/ReportForm";

describe("ReportForm", () => {
  test("should render correctly", () => {
    render(<ReportForm />);

    const headingElement = screen.getByRole("heading", {
      name: "Add a New Report",
    });
    const subjectInputElement = screen.getByRole("textbox", {
      name: "Subject",
    });
    const gradeInputElement = screen.getByRole("textbox", { name: "Grade" });
    const button = screen.getByRole("button");

    expect(headingElement).toBeInTheDocument();
    expect(subjectInputElement).toBeInTheDocument();
    expect(gradeInputElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("user should be able to type in the inputs", async () => {
    user.setup();
    render(<ReportForm />);
    const subjectInputElement = screen.getByRole("textbox", {
      name: "Subject",
    });
    const gradeInputElement = screen.getByRole("textbox", { name: "Grade" });

    await user.type(subjectInputElement, "French");
    await user.type(gradeInputElement, "9");

    expect(subjectInputElement).toHaveValue("French");
    expect(gradeInputElement).toHaveValue("9");
  });
});
