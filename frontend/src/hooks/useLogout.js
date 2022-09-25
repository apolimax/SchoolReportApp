import { useAuthContext } from "./useAuthtContext";
import { useSchoolReportContext } from "./useSchoolReportContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchReports } = useSchoolReportContext();

  const logout = () => {
    // remove user key from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchReports({ type: "SET_REPORTS", payload: [] });
  };

  return logout;
};
