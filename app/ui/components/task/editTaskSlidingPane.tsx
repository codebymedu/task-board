"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidingPane } from "@/app/ui/components/slidingPane";
import { TaskForm } from "@/app/ui/components/task/taskForm";
import { useFormState } from "react-dom";
import { editTask } from "@/app/lib/taskActions";
import { Button } from "@/app/ui/components/button";
import Image from "next/image";

export const EditTaskSlidingPane = () => {
  // --- STATE ---

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("pane") === "editTask";

  const [state, dispatch] = useFormState(editTask, {
    message: null,
    errors: {},
  });

  // --- CALLBACKS ---

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("pane");

    router.replace(
      `${pathname}${params.toString() ? "?" + params.toString() : ""}`
    );
  };

  // --- RENDER ---

  return (
    <SlidingPane handleClose={handleClose} isOpen={isOpen} title="Task details">
      <TaskForm
        actions={
          <div className="gap-4 flex">
            <Button style="secondary">
              Delete{" "}
              <Image alt="" src="/icons/Trash.svg" width={20} height={20} />
            </Button>

            <Button>
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
