"use client";

import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { SlidingPane } from "@/app/ui/components/slidingPane";
import { TaskForm } from "@/app/ui/components/task/taskForm";
import { useFormState } from "react-dom";
import { deleteTask, editTask } from "@/app/lib/taskActions";
import { Button } from "@/app/ui/components/button";
import Image from "next/image";
import { Task, TaskFormState } from "@/app/lib/types";

type EditTaskSlidingPaneProps = {
  task: Task;
};

export const EditTaskSlidingPane = ({ task }: EditTaskSlidingPaneProps) => {
  // --- STATE 1 ---

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // --- HELPERS ---

  const isOpen = searchParams.get("pane") === "editTask";
  const taskId = Number(searchParams.get("taskId"));

  // --- CALLBACKS ---

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("pane");
    params.delete("taskId");

    router.replace(
      `${pathname}${params.toString() ? "?" + params.toString() : ""}`
    );
  };

  const handleDeleteTask = () => deleteTask(taskId).then(handleClose);

  // --- STATE 2 ---

  const [state, dispatch] = useFormState<TaskFormState, FormData>(
    (prevState, taskFormData) =>
      editTask(prevState, taskFormData, taskId).then((validationResults) => {
        if (!validationResults.errors) {
          handleClose();
        }

        return validationResults;
      }),
    {
      message: null,
      errors: {},
    }
  );

  // --- RENDER ---

  if (!taskId && isOpen) {
    return notFound();
  }

  return (
    <SlidingPane handleClose={handleClose} isOpen={isOpen} title="Task details">
      <TaskForm
        actions={
          <div className="mt-4 gap-4 flex flex-col-reverse md:flex-row w-full justify-end">
            <Button
              handleClick={handleDeleteTask}
              className="w-full justify-center md:justify-normal md:w-auto"
              style="secondary"
              type="button"
            >
              Delete{" "}
              <Image alt="" src="/icons/Trash.svg" width={20} height={20} />
            </Button>

            <Button className="w-full  mb-2 md:mb-0 justify-center md:justify-normal md:w-auto">
              Save{" "}
              <Image
                alt=""
                src="/icons/Done_round.svg"
                width={20}
                height={20}
              />
            </Button>
          </div>
        }
        handleSubmit={dispatch}
        initialValues={task}
        validationErrors={state.errors}
      />
    </SlidingPane>
  );
};
