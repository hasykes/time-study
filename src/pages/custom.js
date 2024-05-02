import Timestudy from "@/components/Timestudy";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom() {
  const [taskListString, setTaskListString] = useState(""); //default to empty task list
  const [taskList, setTaskList] = useState([]);
  const [workflowName, setWorkflowName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [workflows, setWorkflows] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(workflows).length === 0) {
      getWorkflowsFromStorage();
    }
  });

  const getWorkflowsFromStorage = () => {
    if (localStorage.getItem("workflows")) {
      setWorkflows(JSON.parse(localStorage.getItem("workflows")));
    }
  };

  const setWorkflowsToStorage = (taskArray) => {
    workflows[workflowName] = taskArray;
    localStorage.setItem("workflows", JSON.stringify(workflows));
  };

  const handleTaskChange = (e) => {
    setErrorMessage("");
    setTaskListString(e.target.value);
  };

  const handleWorkflowChange = (e) => {
    setErrorMessage("");
    setWorkflowName(e.target.value);
  };

  const hasDuplicates = (arr) => {
    return new Set(arr).size !== arr.length;
  };

  const handleSubmit = () => {
    const taskArray = taskListString.split(",");

    if (taskArray.indexOf("") > -1) {
      setErrorMessage("No Blank Values allowed");
      return;
    } else if (taskArray.length === 1) {
      setErrorMessage(
        'You must enter more than one task, seperated by a comma ","'
      );
      return;
    } else if (hasDuplicates(taskArray)) {
      setErrorMessage("You cannot have duplicate task names");
      return;
    } else if (workflowName === "") {
      setErrorMessage("Workflow Name cannot be Blank");
      return;
    } else if (Object.keys(workflows).length > 0 && workflowName in workflows) {
      setErrorMessage(
        "Workflow Name already exists - please clear local storage to make updates"
      );
      return;
    }
    setWorkflowsToStorage(taskArray);
    setTaskList(taskArray);
    router.push(
      encodeURI(
        `/study?workflow=${workflowName}&tasks=${JSON.stringify(
          workflows[workflowName]
        )}`
      )
    );
  };

  if (taskList.length === 0) {
    return (
      <>
        <h1>Input your Tasks Seperated by a "," (e.g. pick,put,place):</h1>
        <label htmlFor="workflowName" className="labels">
          Workflow Name
        </label>
        <input
          name="workflowName"
          type="text"
          className="input"
          onChange={handleWorkflowChange}
        />
        <label htmlFor="taskList" className="labels">
          Task List
        </label>
        <input
          name="taskList"
          type="text"
          className="input"
          onChange={handleTaskChange}
        />
        <button type="button" className="button" onClick={handleSubmit}>
          Submit
        </button>
        <p id="errorMessage">{errorMessage}</p>
      </>
    );
  }
}
