import Timestudy from "@/components/Timestudy";
import { useRouter } from "next/router";
//import styles from "@/styles/Home.module.css";

export default function Study() {
  const { query } = useRouter();
  console.log(query.tasks);
  return (
    <>
      <Timestudy pageName={query.workflow} taskList={query.tasks} />
    </>
  );
}
