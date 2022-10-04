import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuthContext } from "../hooks/useAuthtContext";
import { useSchoolReportContext } from "../hooks/useSchoolReportContext";

function EditReport({ subject, grade, reportId, openModal }) {
  const { user } = useAuthContext();
  const { dispatch } = useSchoolReportContext();

  const [subjectValue, setSubjectValue] = useState(subject);
  const [gradeValue, setGradeValue] = useState(grade);
  const [error, setError] = useState(null);

  const handleEditReport = async (e) => {
    e.preventDefault();

    if (!subjectValue.trim() || !gradeValue) {
      setError("Subject and grade are required");
      return;
    }

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const report = { subject: subjectValue, grade: gradeValue };

    const response = await fetch(`/api/reports/${reportId}`, {
      method: "PATCH",
      body: JSON.stringify(report),
      headers: {
        authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      return;
    } else {
      setError("");
      dispatch({ type: "UPDATE_REPORT", payload: json });
      openModal(false);
    }
  };

  return (
    <form onSubmit={handleEditReport}>
      <label htmlFor="subject">Subject</label>
      <input
        type="text"
        id="subject"
        value={subjectValue}
        onChange={(e) => setSubjectValue(e.target.value)}
      />
      <label htmlFor="grade">Grade</label>
      <input
        type="text"
        id="grade"
        value={gradeValue}
        onChange={(e) => setGradeValue(e.target.value)}
      />
      <div className="edit-form-buttons">
        <button type="submit">Edit Report</button>
        <Dialog.Close className="cancel-edit">Cancel</Dialog.Close>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default EditReport;
