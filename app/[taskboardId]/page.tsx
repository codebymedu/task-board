import { Heading } from "@/app/ui/components/heading";
import { TaskCard } from "@/app/ui/components/task/taskCard";
import { AddNewTaskCard } from "@/app/ui/components/task/addNewTaskCard";
import { AddNewTaskSlidingPane } from "@/app/ui/components/task/addNewTaskSlidingPane";
import { EditTaskSlidingPane } from "@/app/ui/components/task/editTaskSlidingPane";
import { Suspense } from "react";
import { fetchTaskboard } from "@/app/lib/taskBoardActions";
import { TaskList } from "@/app/ui/components/task/taskList";

export default async function Home({
  params,
}: {
  params: { taskboardId: string };
}) {
  const taskboard = await fetchTaskboard(Number(params.taskboardId));

  // --- RENDER ---

  return (
    <main className=" py-8 md:py-16 px-4 md:px-0 w-full md:w-1/2 lg:w-1/3 m-auto ">
      <Heading title={taskboard?.name || "Loading"} />

      <TaskList taskboardId={Number(params.taskboardId)} />

      <Suspense fallback="Loading">
        <AddNewTaskCard />
      </Suspense>

      {/* Sliding Panes */}
      <Suspense fallback="Loading">
        <AddNewTaskSlidingPane />
      </Suspense>

      <Suspense fallback="Loading">
        <EditTaskSlidingPane />
      </Suspense>
    </main>
  );
}
