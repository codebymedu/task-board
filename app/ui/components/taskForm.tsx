import { RadioGroup, Field, Label, Radio } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import Image from "next/image";

type TaskFormFields = {
  name: string;
  description: string;
  icon?: string;
  status?: string;
};

type TaskFormProps = {
  actions: ReactNode;
  initialValues?: Partial<TaskFormFields>;
};

export const TaskForm = ({ actions, initialValues }: TaskFormProps) => {
  // --- STATE ---

  const [selectedIconId, setSelectedIconId] = useState<string | number>(1);

  const [selectedStatus, setSelectedStatus] = useState<Status>();

  // --- RENDER ---

  return (
    <form className="flex flex-col justify-between h-full">
      <div>
        <div className="mb-6">
          <label
            htmlFor="taskName"
            className="block text-sm font-medium leading-6 text-gray-400 "
          >
            Task name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="taskName"
              id="taskName"
              className="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Enter a task name"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="taskDescription"
            className="block text-sm font-medium leading-6 text-gray-400"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              rows={4}
              name="taskDescription"
              id="taskDescription"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-blue-500 sm:text-sm sm:leading-6"
              defaultValue={""}
              placeholder="Enter a short description"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="taskIcon"
            className="block text-sm font-medium leading-6 text-gray-400"
          >
            Icon
          </label>

          <RadioGroup
            className="mt-2 flex gap-4"
            name="taskIcon"
            value={selectedIconId}
            onChange={setSelectedIconId}
          >
            {Object.entries(TASK_ICONS).map(([iconId, icon]) => (
              <Field
                key={iconId}
                className={clsx(
                  "p-3 bg-gray-200 rounded-md cursor-pointer hover:scale-105 duration-100 ease-in-out",
                  {
                    "bg-in-progress": Number(selectedIconId) === Number(iconId),
                  }
                )}
                onClick={() => setSelectedIconId(iconId)}
              >
                <Radio value={iconId} />

                <Label className="cursor-pointer">{icon}</Label>
              </Field>
            ))}
          </RadioGroup>
        </div>

        <div className="mb-6">
          <label
            htmlFor="taskIcon"
            className="block text-sm font-medium leading-6 text-gray-400"
          >
            Status
          </label>

          <RadioGroup
            className="mt-2 grid gap-4 grid-cols-2"
            name="taskStatus"
            value={selectedStatus}
            onChange={setSelectedStatus}
          >
            {Object.entries(TASK_STATUS_STYLE).map(
              ([statusKey, statusStyles]) => (
                <Field
                  key={statusKey}
                  className={clsx(
                    "border-2 border-gray-200 rounded-lg cursor-pointer hover:scale-105 duration-100 ease-in-out",
                    {
                      "border-blue-500": selectedStatus === statusKey,
                    }
                  )}
                  onClick={() => setSelectedStatus(statusKey as Status)}
                >
                  <Radio value={status} />

                  <Label className="cursor-pointer justify-between flex h-full items-center">
                    <div className="flex gap-2 items-center">
                      <div
                        className={clsx(
                          "h-10 w-10 m-1 rounded-md flex justify-center",
                          statusStyles.backgroundColor
                        )}
                      >
                        <Image
                          alt=""
                          src={statusStyles.icon}
                          height={20}
                          width={20}
                        />
                      </div>

                      {statusStyles.label}
                    </div>

                    {selectedStatus === statusKey && (
                      <div className="h-5 w-5 m-2 rounded-full flex justify-center bg-blue-500">
                        <Image
                          alt=""
                          src="/icons/Done_round.svg"
                          height={16}
                          width={16}
                        />
                      </div>
                    )}
                  </Label>
                </Field>
              )
            )}
          </RadioGroup>
        </div>
      </div>

      <div className="w-full justify-end flex">{actions}</div>
    </form>
  );
};

const TASK_ICONS = {
  1: "🖥️",
  2: "💬",
  3: "☕",
  4: "🏋️‍♂️",
  5: "📚",
  6: "⏰",
};

type Status = "completed" | "inProgress" | "willNotDo";

const TASK_STATUS_STYLE: Record<
  Status,
  { label: string; icon: string; backgroundColor: string }
> = {
  completed: {
    label: "Completed",
    icon: "/icons/Done_round_duotone.svg",
    backgroundColor: "bg-completed-icon",
  },
  inProgress: {
    label: "In Progress",
    icon: "/icons/Time_atack_duotone.svg",
    backgroundColor: "bg-in-progress-icon",
  },
  willNotDo: {
    label: "Won't do",
    icon: "/icons/Close_ring_duotone.svg",
    backgroundColor: "bg-will-not-do-icon",
  },
};
