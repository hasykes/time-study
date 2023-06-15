//import useState from 'react';
import moment from "moment";

const Tasks = (props) => {
  //const [taskList,setTask] = useState([]);
  const logEvent = (taskName) => {
    const momentObj = moment();
    const curDateTime = momentObj.format("YYYY-MM-DD hh:mm:ss");
    const lastEvent = props.eventList[props.eventList.length - 1];

    props.setEventList((prevEventList) => {
      const secondsToComplete =
        props.eventList.length === 0
          ? 0
          : (
              momentObj.diff(lastEvent.momentObj, "milliseconds") / 1000
            ).toFixed(1);
      return [
        ...prevEventList,
        {
          name: taskName,
          timestamp: curDateTime,
          secondsToComplete,
          pickId: props.eventCount + 1,
          momentObj,
        },
      ];
    });
  };

  const convertToCSVandEmail = (eventList) => {
    const relevantData = eventList.map(({ momentObj, ...rel }) => rel);

    const headers = Object.keys(relevantData[0]);
    const csvContent = `${headers.join(",")}\n${relevantData
      .map((row) => headers.map((header) => row[header]).join(","))
      .join("\n")}`;

    const encodedUri = encodeURI(csvContent);

    window.open(
      `mailto:?subject=Time Study CSV Data ${moment().format(
        "YYYY-MM-DD"
      )}&body=${encodedUri}`
    );
  };

  const handleEndStudyButtonClick = () => {
    props.setTimerShouldRun(false);
    convertToCSVandEmail(props.eventList);
  };

  const handleTaskButtonClick = (buttonIndex, taskName) => {
    logEvent(taskName);
    if (buttonIndex === props.taskList.length - 1) {
      props.setEventCount((prevEventCount) => prevEventCount + 1);
    }

    if (!props.timerShouldRun) {
      props.setTimerShouldRun(true);
    }
  };

  return (
    <div>
      {props.taskList.map((task, i) => {
        return (
          <button
            key={"id_" + i}
            id={task + "_button"}
            className="button"
            onClick={() => handleTaskButtonClick(i, task)}
          >
            {task}
          </button>
        );
      })}
      <button id="end_button" onClick={handleEndStudyButtonClick}>
        End Study
      </button>
    </div>
  );
};

export default Tasks;
