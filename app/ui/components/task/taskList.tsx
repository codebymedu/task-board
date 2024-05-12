import { fetchTasksByTaskboardId } from "@/app/lib/taskActions";
import { Suspense } from "react";
import { TaskCard } from "@/app/ui/components/task/taskCard";

type TaskListProps = { taskboardId: number };

export const TaskList = async ({ taskboardId }: TaskListProps) => {
  const tasks = await fetchTasksByTaskboardId(taskboardId);

  // --- RENDER ---

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
