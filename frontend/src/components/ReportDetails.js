const ReportDetails = ({ report, handleClick }) => {
  return (
    <div className="workout-details">
      <h4>{report.subject}</h4>
      <p>
        <strong>Grade: </strong>
        {report.grade}
      </p>
      <p>
        {new Intl.DateTimeFormat("en-US").format(new Date(report.createdAt))}
      </p>
      <span
        className="material-symbols-outlined"
        onClick={() => handleClick(report._id)}
      >
        delete
      </span>
    </div>
  );
};

export default ReportDetails;
