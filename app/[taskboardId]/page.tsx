import { Heading } from "@/app/ui/components/heading";
import { AddNewTaskCard } from "@/app/ui/components/task/addNewTaskCard";
import { AddNewTaskSlidingPane } from "@/app/ui/components/task/addNewTaskSlidingPane";
import { EditTaskSlidingPane } from "@/app/ui/components/task/editTaskSlidingPane";
import { Suspense } from "react";
import { fetchTaskboard } from "@/app/lib/taskBoardActions";
import { TaskList } from "@/app/ui/components/task/taskList";
import { fetchTask } from "@/app/lib/taskActions";

export default async function Home({
  params,
  searchParams,
}: {
  searchParams?: { taskId?: string };
  params: { taskboardId: string };
}) {
  // --- PROMISES ---

  const taskboardPromise = fetchTaskboard(Number(params.taskboardId));

  const activeTaskPromise = searchParams?.taskId
    ? fetchTask(Number(searchParams?.taskId))
    : undefined;

  const [taskboard, activeTask] = await Promise.all([
    taskboardPromise,
    activeTaskPromise,
  ]);

  // --- RENDER ---

  return (
    <main className=" py-8 md:py-16 px-4 md:px-0 w-full md:w-1/2 lg:w-1/3 m-auto ">
      <Heading
        taskboardId={Number(params.taskboardId)}
        title={taskboard?.name || "Loading"}
      />

      <TaskList taskboardId={Number(params.taskboardId)} />

      <Suspense fallback="Loading">
        <AddNewTaskCard />
      </Suspense>

      {/* Sliding Panes */}
      <Suspense fallback="Loading">
        <AddNewTaskSlidingPane />
      </Suspense>

      <Suspense fallback="Loading">
        {activeTask && <EditTaskSlidingPane task={activeTask} />}
      </Suspense>
    </main>
  );
}
