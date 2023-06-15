const Results = (props) => {
  if (props.eventList.length === 0) {
    return;
  }

  const undoEvent = () => {
    const newEventList = props.eventList;
    newEventList.pop();
    props.setEventList([...newEventList]);
  };

  const restartStudy = () => {
    window.location.reload(); //just reload the page
  };

  return (
    <>
      <div id="results_button_container">
        <button id="undo_button" className="button " onClick={undoEvent}>
          Undo Event
        </button>
        <button id="restart_button" className="button" onClick={restartStudy}>
          Restart
        </button>
      </div>
      <table id="results_table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Time Stamp</th>
            <th>Seconds to Complete</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {props.eventList.map((event, i) => {
            return (
              <tr key={"eventID_" + i}>
                <td>{event.name}</td>
                <td>{event.timestamp}</td>
                <td>{event.secondsToComplete}</td>
                <td>{event.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Results;
