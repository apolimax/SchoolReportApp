import { render, screen } from "../test-utils";
import user from "@testing-library/user-event";

import EditReport from "../components/EditReport";

const props = {
  subject: "French",
  grade: "9",
  reportId: "6330c9557299dd07f5f0ea17",
  openModal: jest.fn(),
};

describe("EditReport", () => {
  test("should render correctly", () => {
    render(<EditReport {...props} />);

    const subjectInputElement = screen.getByRole("textbox", {
      name: "Subject",
    });
    const gradeInputElement = screen.getByRole("textbox", { name: "Grade" });
    const editButton = screen.getByRole("button", { name: "Edit Report" });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });

    expect(subjectInputElement).toBeInTheDocument();
    expect(gradeInputElement).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test("user should be able to type in the inputs", async () => {
    user.setup();
    render(<EditReport {...props} />);
    const subjectInputElement = screen.getByRole("textbox", {
      name: "Subject",
    });
    const gradeInputElement = screen.getByRole("textbox", { name: "Grade" });

    await user.clear(subjectInputElement);
    await user.clear(gradeInputElement);
    await user.type(subjectInputElement, "Portuguese");
    await user.type(gradeInputElement, "9.5");

    expect(subjectInputElement).toHaveValue("Portuguese");
    expect(gradeInputElement).toHaveValue("9.5");
  });

  test("user cannot submit the form if one of the fields are empty", async () => {
    user.setup();
    render(<EditReport {...props} />);
    const subjectInputElement = screen.getByRole("textbox", {
      name: "Subject",
    });
    const gradeInputElement = screen.getByRole("textbox", { name: "Grade" });
    const editButton = screen.getByRole("button", { name: "Edit Report" });

    await user.clear(subjectInputElement);
    await user.type(gradeInputElement, "9.5");
    await user.click(editButton);

    const errorMssg = screen.getByText("Subject and grade are required");
    expect(errorMssg).toBeInTheDocument();
  });
});
