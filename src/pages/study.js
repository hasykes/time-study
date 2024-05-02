import Timestudy from "@/components/Timestudy";
import { useRouter } from "next/router";
import { useState } from "react";
//import styles from "@/styles/Home.module.css";

export default function Study() {
  const { query } = useRouter();

  return (
    <>
      <Timestudy pageName={query.workflow} taskList={query.tasks} />
    </>
  );
}
