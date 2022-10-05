import { useLogin } from "../hooks/useLogin";
import { renderHook } from "../test-utils";

jest.mock("../hooks/useAuthtContext", () => ({
  useAuthContext: () => {
    return {
      dispatch: jest.fn(),
    };
  },
}));

describe("useLogin", () => {
  test("should request the login user route", () => {
    const { result } = renderHook(useLogin);
    console.log(result);
  });
});
