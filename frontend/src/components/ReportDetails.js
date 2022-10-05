import EditReportModal from "./EditReportModal";

const ReportDetails = ({ report, handleClick }) => {
  return (
    <li className="workout-details">
      <div>
        <h4>{report.subject}</h4>
        <p>
          <strong>Grade: </strong>
          {report.grade}
        </p>
        <p>
          {new Intl.DateTimeFormat("en-US").format(new Date(report.updatedAt))}
        </p>
      </div>
      <div>
        <EditReportModal report={report} />
        <button
          className="material-symbols-outlined"
          onClick={() => handleClick(report._id)}
        >
          delete
        </button>
      </div>
    </li>
  );
};

export default ReportDetails;
