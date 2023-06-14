const Results = (props) => {
  if (props.eventList.length === 0) {
    return;
  }
  return (
    <>
      <button id="downloadCSV" className="button">
        Download CSV
      </button>
      <button id="delete_button" className="button">
        Delete
      </button>
      <button id="clearAll_button" className="button">
        Clear All
      </button>
      <table id="results_table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Time Stamp</th>
            <th>Seconds to Complete</th>
            <th>Pick ID</th>
          </tr>
        </thead>
        <tbody>
          {props.eventList.map((event, i) => {
            return (
              <tr key={"eventID_" + i}>
                <td>{event.name}</td>
                <td>{event.timestamp}</td>
                <td>{event.secondsToComplete}</td>
                <td>{event.pickId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Results;
