import { schoolReportContext } from "../context/schoolReportContext";
import { useContext } from "react";

export const useSchoolReportContext = () => {
  const context = useContext(schoolReportContext);

  if (!context) {
    throw Error(
      "useSchoolReportContext must be used inside a SchoolReportContextProvider"
    );
  }

  return context;
};
