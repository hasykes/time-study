import Timestudy from "@/components/Timestudy";
//import styles from "@/styles/Home.module.css";

export default function Putaway() {
  return (
    <>
      <Timestudy
        pageName="Putaway"
        taskList={[
          "Walk",
          "Read",
          "Scan Case",
          "Scan Location",
          "Break Case",
          "Place",
        ]}
      />
    </>
  );
}
