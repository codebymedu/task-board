import { fetchTasksByTaskboardId } from "@/app/lib/taskActions";
import { Suspense } from "react";
import { TaskCard } from "@/app/ui/components/task/taskCard";

type TaskListProps = { taskboardId: number };

export const TaskList = async ({ taskboardId }: TaskListProps) => {
  const tasks = await fetchTasksByTaskboardId(taskboardId);

  // --- RENDER ---

  if (!tasks?.length) {
    return (
      <div className="w-full text-center my-4 mt-8 p-4 rounded-lg border-2 border-dashed border-gray-300">
        {" "}
        <h3 className=" text-sm font-semibold text-gray-900">No tasks yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new task.
        </p>
      </div>
    );
  }

  return (
    <section>
      <Suspense>
        <>
          {tasks?.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              className="mb-4 first:mt-8"
              description={task.description}
              icon={task.icon}
              name={task.name}
              status={task.status || "toDo"}
            />
          ))}
        </>
      </Suspense>
    </section>
  );
};
