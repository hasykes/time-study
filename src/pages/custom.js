import Timestudy from "@/components/Timestudy";
//import styles from "@/styles/Home.module.css";

export default function Custom() {
  return (
    <>
      <Timestudy
        pageName="Custom"
        taskList={["Walk", "Locate", "Pick", "Place"]}
      />
    </>
  );
}
