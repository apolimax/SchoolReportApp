import { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthtContext";

export const schoolReportContext = createContext();

export const schoolReportsReducer = (state, action) => {
  switch (action.type) {
    case "SET_REPORTS":
      return {
        reports: action.payload,
      };
    case "CREATE_REPORT":
      return {
        reports: [action.payload, ...state.reports],
      };
    case "DELETE_REPORT":
      return {
        reports: state.reports.filter(
          (report) => report._id !== action.payload._id
        ),
      };
    case "UPDATE_REPORT":
      return {
        reports: state.reports.map((report) => {
          if (report._id === action.payload._id) {
            return action.payload;
          }
          return report;
        }),
      };
    default:
      return state;
  }
};

export const SchoolReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(schoolReportsReducer, {
    reports: [],
  });

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSchoolReports = async () => {
      const response = await fetch("/api/reports", {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_REPORTS", payload: json });
      }
    };

    if (user) {
      fetchSchoolReports();
    }
  }, [dispatch, user]);

  return (
    <schoolReportContext.Provider value={{ ...state, dispatch }}>
      {children}
    </schoolReportContext.Provider>
  );
};
