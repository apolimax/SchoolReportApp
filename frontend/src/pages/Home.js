import { useSchoolReportContext } from "../hooks/useSchoolReportContext";

import ReportDetails from "../components/ReportDetails";
import ReportForm from "../components/ReportForm";
import { useAuthContext } from "../hooks/useAuthtContext";

const Home = () => {
  const { reports, dispatch } = useSchoolReportContext();
  const { user } = useAuthContext();

  const handleDeleteReport = async (report_id) => {
    if (!user) return;

    const response = await fetch("/api/reports/" + report_id, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_REPORT", payload: json });
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {reports &&
          reports.map((report) => (
            <ReportDetails
              report={report}
              key={report._id}
              handleClick={handleDeleteReport}
            />
          ))}
      </div>
      <ReportForm />
    </div>
  );
};

export default Home;
