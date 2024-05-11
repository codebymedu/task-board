"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidingPane } from "@/app/ui/components/slidingPane";
import { TaskForm } from "@/app/ui/components/taskForm";

export const EditTaskSlidingPane = () => {
  // --- STATE ---

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("pane") === "editTask";

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
      <TaskForm actions={<div>delete/ save</div>} />
    </SlidingPane>
  );
};
