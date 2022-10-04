import { render, screen } from "../test-utils";
import user from "@testing-library/user-event";

import Signin from "../pages/Signin";

let mockedError = null;

jest.mock("../hooks/useLogin", () => ({
  useLogin: () => ({ isLoading: false, error: mockedError, login: jest.fn() }),
}));

describe("Signin", () => {
  test("should render correctly", () => {
    render(<Signin />);

    const heading = screen.getByRole("heading", { level: 3 });
    const emailInputElement = screen.getByRole("textbox", {
      name: "E-mail",
    });
    const passwordInputElement = screen.getByLabelText("Password");
    const signinButton = screen.getByRole("button", { name: "Sign in" });

    expect(heading).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
  });

  test("user should be able to type in the form fields", async () => {
    user.setup();
    render(<Signin />);

    const emailInputElement = screen.getByRole("textbox", {
      name: "E-mail",
    });
    const passwordInputElement = screen.getByLabelText("Password");

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "123");
  });

  test("Error message is displayed when there was an error fetching the API", () => {
    mockedError = "Error";
    render(<Signin />);

    const ErrorMssg = screen.getByText("Error");
    expect(ErrorMssg).toHaveClass("error");
  });
});
