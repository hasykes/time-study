import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react"; //import styles from "@/styles/Home.module.css";

export default function Home() {
  const [workflows, setWorkflows] = useState({
    Pick: ["Walk", "Locate", "Pick", "Place"],
    Induct: ["Grab", "Scan", "Place", "Select"],
    Putaway: [
      "Walk",
      "Read",
      "Scan Case",
      "Scan Location",
      "Break Case",
      "Place",
    ],
  });

  useEffect(() => {
    if (Object.keys(workflows).length === 0) {
      getWorkflowsFromStorage();
    }
  });

  const getWorkflowsFromStorage = () => {
    if (localStorage.getItem("workflows")) {
      setWorkflows([
        ...workflows,
        JSON.parse(localStorage.getItem("workflows")),
      ]);
    }
  };

  return (
    <>
      <Head>
        <title>Time-Study</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Warehouse Time-Study Tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <main>
        {Object.keys(workflows).map((workflow, i) => {
          return (
            <Link
              key={`workflow-${i}`}
              id={`${workflow}_main_button`}
              className="button"
              href={encodeURI(
                `/study?workflow=${workflow}&tasks=${JSON.stringify(
                  workflows[workflow]
                )}`
              )}
            >
              {workflow}
            </Link>
          );
        })}
        <Link id="custom_main_button" className="button" href="/custom">
          Custom
        </Link>
      </main>
    </>
  );
}
