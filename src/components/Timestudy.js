import Head from "next/head";
//import Link from "next/link";
import Timer from "../components/Timer";
import Results from "../components/Results";
import Tasks from "../components/Tasks";
import { useState, useEffect } from "react";

//wrapper component for each Time Study
const Timestudy = (props) => {
  const [timerShouldRun, setTimerShouldRun] = useState(false);
  const [timer, setTimer] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [eventList, setEventList] = useState([]);
  var tasks = [];
  if (props.taskList) {
    tasks = JSON.parse(props.taskList);
  }
  //useEffect(() => {}, [eventList]);

  return (
    <>
      <Head>
        <title>{props.pageName}</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Time-Study Tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <main>
        <Timer
          setTimerShouldRun={setTimerShouldRun}
          timerShouldRun={timerShouldRun}
          timer={timer}
          setTimer={setTimer}
          eventCount={eventCount}
          setEventCount={setEventCount}
        />
        <Tasks
          taskList={tasks}
          setEventCount={setEventCount}
          eventCount={eventCount}
          setTimerShouldRun={setTimerShouldRun}
          timerShouldRun={timerShouldRun}
          setEventList={setEventList}
          eventList={eventList}
        />
        <Results
          eventList={eventList}
          setEventList={setEventList}
          setEventCount={setEventCount}
          eventCount={eventCount}
        />
      </main>
    </>
  );
};

export default Timestudy;
