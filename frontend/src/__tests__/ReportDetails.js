import { render, screen } from "../test-utils";

import ReportDetails from "../components/ReportDetails";

const props = {
  report: {
    subject: "English",
    grade: "8",
    updatedAt: "2022-09-26T16:16:19.742+00:00",
    _id: "6330c9557299dd07f5f0ea17",
  },
  handleClick: jest.fn(),
};

describe("ReportDetails", () => {
  test("should render correctly", () => {
    render(<ReportDetails {...props} />);
    /* logRoles(container); */
    /* screen.debug(); */
    const subject = screen.getByRole("heading", { name: props.report.subject });
    const grade = screen.getByText(props.report.grade);
    const date = screen.getByText("9/26/2022");
    const editButton = screen.getByRole("button", { name: "edit" });
    const deleteButton = screen.getByRole("button", { name: "delete" });

    expect(subject).toBeInTheDocument();
    expect(grade).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
