import Image from "next/image";
import { Heading } from "@/app/ui/components/heading";
import { TaskCard } from "@/app/ui/components/taskCard";
import { AddNewTaskCard } from "@/app/ui/components/addNewTaskCard";
import { AddNewTaskSlidingPane } from "@/app/ui/components/addNewTaskSlidingPane";

export default function Home() {
  // --- RENDER ---

  return (
    <main className=" py-16  w-1/3 m-auto ">
      <Heading />
      {/* TODO: Task List */}
      <br />
      <TaskCard
        description="asd"
        icon="💻"
        name="Do this task next"
        status="willNotDo"
      />
      <br />
      <AddNewTaskCard />
      <AddNewTaskSlidingPane />
    </main>
  );
}
