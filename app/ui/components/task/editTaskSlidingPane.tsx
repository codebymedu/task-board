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
import { deleteTaskById, editTask } from "@/app/lib/taskActions";
import { Button } from "@/app/ui/components/button";
import Image from "next/image";

export const EditTaskSlidingPane = () => {
  // --- STATE ---

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [state, dispatch] = useFormState(editTask, {
    message: null,
    errors: {},
  });

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

  const handleDeleteTask = () => deleteTaskById(taskId).then(handleClose);

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
        validationErrors={state.errors}
      />
    </SlidingPane>
  );
};
