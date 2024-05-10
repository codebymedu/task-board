import clsx from "clsx";
import Image from "next/image";

type TaskCardProps = {
  status: "inProgress" | "completed" | "willNotDo" | "toDo";
  name: string;
  description?: string;
  icon: string;
};

export const TaskCard = ({
  description,
  icon = "✔️",
  name,
  status,
}: TaskCardProps) => {
  // --- RENDER ---

  return (
    <div
      className={`bg-${TASK_STYLES_BY_STATUS[status].backgroundColor} p-4 flex justify-between  rounded-xl cursor-pointer`}
    >
      <div
        className={clsx("flex gap-4", {
          "items-center": !Boolean(description),
        })}
      >
        <div className="min-w-12 min-h-12 w-12 h-12 bg-white rounded-lg flex justify-center items-center">
          {icon}
        </div>

        <div className="flex flex-col ">
          <h2 className="text-xl font-semibold">{name}</h2>

          <p className="font-light">{description}</p>
        </div>
      </div>

      {TASK_STYLES_BY_STATUS[status].statusIcon && (
        <div
          className={`min-w-12 min-h-12 w-12 h-12 ml-4 bg-${TASK_STYLES_BY_STATUS[status].statusIconBackgroundColor} rounded-lg flex justify-center items-center`}
        >
          <Image
            alt=""
            src={TASK_STYLES_BY_STATUS[status].statusIcon!}
            width={20}
            height={20}
          />
        </div>
      )}
    </div>
  );
};

const TASK_STYLES_BY_STATUS: Record<
  TaskCardProps["status"],
  {
    backgroundColor: string;
    statusIcon?: string;
    statusIconBackgroundColor?: string;
  }
> = {
  completed: {
    backgroundColor: "completed-bg",
    statusIconBackgroundColor: "completed-icon-bg",
    statusIcon: "/icons/Done_round_duotone.svg",
  },
  inProgress: {
    backgroundColor: "in-progress-bg",
    statusIconBackgroundColor: "in-progress-icon-bg",
    statusIcon: "/icons/Time_atack_duotone.svg",
  },
  willNotDo: {
    backgroundColor: "will-not-do-bg",
    statusIconBackgroundColor: "will-not-do-icon-bg",
    statusIcon: "/icons/close_ring_duotone.svg",
  },
  toDo: {
    backgroundColor: "to-do-bg",
  },
};
