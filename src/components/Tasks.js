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
          pickId: props.eventCount,
          momentObj,
        },
      ];
    });
  };

  const handleButtonClick = (buttonIndex, taskName) => {
    //all buttons should fire a logged event
    logEvent(taskName);
    if (buttonIndex > props.taskList.length) {
      props.setTimerShouldRun(false); //last button is end study
      return;
    }
    if (buttonIndex === props.taskList.length - 1) {
      props.setEventCount((prevEventCount) => prevEventCount + 1); //last task button should log a completed task
    }
    if (props.timerShouldRun) {
      props.setTimerShouldRun(false);
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
            onClick={() => handleButtonClick(i, task)}
          >
            {task}
          </button>
        );
      })}
      <button
        id="end_button"
        onClick={() => handleButtonClick(999, "End Study")}
      >
        End Study
      </button>
    </div>
  );
};

export default Tasks;
