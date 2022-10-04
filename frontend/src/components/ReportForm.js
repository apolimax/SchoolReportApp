import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthtContext";
import { useSchoolReportContext } from "../hooks/useSchoolReportContext";

const ReportForm = () => {
  const { dispatch } = useSchoolReportContext();
  const { user } = useAuthContext();

  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const report = { subject, grade };

    const response = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify(report),
      headers: {
        authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setSubject("");
      setGrade("");
      dispatch({ type: "CREATE_REPORT", payload: json });
    }
  };

  return (
    <div className="create_report">
      <h3>Add a New Report</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          className={emptyFields.includes("subject") ? "error" : ""}
        />

        <label htmlFor="grade">Grade</label>
        <input
          type="text"
          id="grade"
          onChange={(e) => setGrade(e.target.value)}
          value={grade}
          className={emptyFields.includes("grade") ? "error" : ""}
        />

        <button>Add Report</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default ReportForm;
