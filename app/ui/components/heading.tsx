"use client";

import { updateTaskboardName } from "@/app/lib/taskBoardActions";
import Image from "next/image";
import { useRef, useCallback } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import toast from "react-hot-toast";

type HeadingProps = { title: string; taskboardId: number };

export const Heading = ({ title, taskboardId }: HeadingProps) => {
  // --- STATE ---

  const taskboardTitle = useRef(title);

  // --- CALLBACKS ---

  const handleChange = useCallback((event: ContentEditableEvent) => {
    taskboardTitle.current = event.target.value;
  }, []);

  const handleBlur = useCallback(() => {
    toast.success("Taskboard title changed successfully.");

    updateTaskboardName(taskboardId, taskboardTitle.current);
  }, []);

  // --- RENDER ---

  return (
    <header className="flex gap-3 items-start">
      <Image
        alt="Task Board Logo"
        src="/icons/Logo.svg"
        width={40}
        height={40}
      />

      <div className="flex gap-6 flex-col -mt-2">
        <ContentEditable
          html={taskboardTitle.current}
          onChange={handleChange}
          onBlur={handleBlur}
          className="text-4xl"
        />

        <p>Tasks to keep organised</p>
      </div>

      <Image
        alt="Edit icon"
        src="/icons/Edit_duotone.svg"
        width={24}
        height={24}
      />
    </header>
  );
};
