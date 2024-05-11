import { Heading } from "@/app/ui/components/heading";
import { TaskCard } from "@/app/ui/components/task/taskCard";
import { AddNewTaskCard } from "@/app/ui/components/task/addNewTaskCard";
import { AddNewTaskSlidingPane } from "@/app/ui/components/task/addNewTaskSlidingPane";
import { EditTaskSlidingPane } from "./ui/components/task/editTaskSlidingPane";

export default function Home() {
  // --- RENDER ---

  return (
    <main className=" py-8 md:py-16 px-4 md:px-0 w-full md:w-1/2 lg:w-1/3 m-auto ">
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

      {/* Sliding Panes */}
      <AddNewTaskSlidingPane />
      <EditTaskSlidingPane />
    </main>
  );
}
