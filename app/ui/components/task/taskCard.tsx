"use client";

import { TASK_ICONS, TASK_STATUS_STYLES } from "@/app/lib/taskUI";
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type TaskCardProps = {
  status: "inProgress" | "completed" | "willNotDo" | "toDo";
  name: string;
  description?: string;
  icon: number;
  className?: string;
};

export const TaskCard = ({
  description,
  icon,
  name,
  status,
  className,
}: TaskCardProps) => {
  // --- STATE ---

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // --- CALLBACKS ---

  const handleOpenEditSlidingPane = () => {
    const params = new URLSearchParams(searchParams);
    params.set("pane", "editTask");
    router.replace(`${pathname}?${params.toString()}`);
  };

  // --- RENDER ---

  return (
    <div
      onClick={handleOpenEditSlidingPane}
      className={clsx(
        `bg-${TASK_STATUS_STYLES[status].backgroundColor} p-4 flex justify-between  rounded-xl cursor-pointer hover:scale-105 ease-in-out duration-100`,
        className
      )}
    >
      <div
        className={clsx("flex gap-4", {
          "items-center": !Boolean(description),
        })}
      >
        <div className="min-w-12 min-h-12 w-12 h-12 bg-white rounded-lg flex justify-center items-center">
          {TASK_ICONS[icon]}
        </div>

        <div className="flex flex-col ">
          <h2 className="text-xl font-semibold">{name}</h2>

          <p className="font-light">{description}</p>
        </div>
      </div>

      {TASK_STATUS_STYLES[status].icon && (
        <div
          className={`min-w-12 min-h-12 w-12 h-12 ml-4 bg-${TASK_STATUS_STYLES[status].iconBackgroundColor} rounded-lg flex justify-center items-center`}
        >
          <Image
            alt=""
            src={TASK_STATUS_STYLES[status].icon!}
            width={20}
            height={20}
          />
        </div>
      )}
    </div>
  );
};
