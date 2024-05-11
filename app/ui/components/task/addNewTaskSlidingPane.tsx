"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidingPane } from "@/app/ui/components/slidingPane";
import { TaskForm } from "@/app/ui/components/task/taskForm";
import { createTask } from "@/app/lib/taskActions";
import { useFormState } from "react-dom";
import { Button } from "@/app/ui/components/button";
import Image from "next/image";
import { TaskFormState } from "@/app/lib/types";

export const AddNewTaskSlidingPane = () => {
  // --- STATE 1 ---

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("pane") === "newTask";

  // --- CALLBACKS ---

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("pane");

    router.replace(
      `${pathname}${params.toString() ? "?" + params.toString() : ""}`
    );
  };

  // --- STATE 2 ---

  const [state, dispatch] = useFormState<TaskFormState, FormData>(
    (prevState, taskFormData) =>
      createTask(
        prevState,
        taskFormData,
        Number(pathname.replace("/", ""))
      ).then((validationResults) => {
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

  return (
    <SlidingPane handleClose={handleClose} isOpen={isOpen} title="Add new task">
      <TaskForm
        actions={
          <Button className="w-full  justify-center md:justify-normal md:w-auto">
            Add new task{" "}
            <Image alt="" src="/icons/Done_round.svg" width={20} height={20} />
          </Button>
        }
        handleSubmit={dispatch}
        validationErrors={state.errors}
      />
    </SlidingPane>
  );
};
