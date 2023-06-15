import { useEffect } from "react";
//import styles from "@/styles/Home.module.css";

const Timer = (props) => {
  useEffect(() => {
    let interval;

    if (props.timerShouldRun) {
      interval = setInterval(() => {
        props.setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [props.timerShouldRun]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div id="status">
        <span>Tasks Counted: </span>
        <span>{props.eventCount}</span>
      </div>
      <div id="timer">
        <span>Time Elapsed (mm:ss): </span>
        <span id="time_elapsed_text">{formatTime(props.timer)}</span>
      </div>
    </>
  );
};

export default Timer;
