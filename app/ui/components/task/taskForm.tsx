import { RadioGroup, Field, Label, Radio } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { TaskFormFields, TaskFormState, TaskStatus } from "@/app/lib/types";
import { TASK_ICONS, TASK_STATUS_STYLES } from "@/app/lib/taskUI";

type TaskFormProps = {
  actions: ReactNode;
  initialValues?: Partial<TaskFormFields>;
  handleSubmit: (formData: FormData) => void;
  validationErrors?: TaskFormState["errors"];
};

/**
 * An uncontrollable task form that is supposed to be used with useFormState from "react-dom".
 *
 * Is supposed to be reusable enough for both editing and creating new tasks.
 */
export const TaskForm = ({
  actions,
  initialValues,
  handleSubmit,
  validationErrors,
}: TaskFormProps) => {
  // --- STATE ---

  const [selectedIconId, setSelectedIconId] = useState<string | number>(
    initialValues?.icon || 1
  );

  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | undefined>(
    initialValues?.status || undefined
  );

  // --- RENDER ---

  return (
    <form
      action={handleSubmit}
      className="flex flex-col justify-between h-full"
    >
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
              name="name"
              id="taskName"
              className="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Enter a task name"
              aria-describedby="name-error"
              defaultValue={initialValues?.name}
            />
          </div>

          {validationErrors?.name &&
            validationErrors.name.map((error) => (
              <p
                key={error}
                className="mt-2 text-sm text-red-600"
                id="name-error"
              >
                {error}
              </p>
            ))}
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
              name="description"
              id="taskDescription"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-blue-500 sm:text-sm sm:leading-6"
              defaultValue={initialValues?.description}
              placeholder="Enter a short description"
              aria-describedby="description-error"
            />
          </div>

          {validationErrors?.description &&
            validationErrors.description.map((error) => (
              <p
                key={error}
                className="mt-2 text-sm text-red-600"
                id="description-error"
              >
                {error}
              </p>
            ))}
        </div>

        <div className="mb-6">
          <label
            htmlFor="taskIcon"
            className="block text-sm font-medium leading-6 text-gray-400"
          >
            Icon
          </label>

          <RadioGroup
            className="mt-2 grid grid-cols-3 md:grid-cols-8 gap-4"
            name="icon"
            value={selectedIconId}
            onChange={setSelectedIconId}
          >
            {Object.entries(TASK_ICONS).map(([iconId, icon]) => (
              <Field
                key={iconId}
                className={clsx(
                  "p-1 border-2 border-gray-200 bg-gray-200 rounded-md cursor-pointer hover:scale-105 text-xl duration-100 ease-in-out flex justify-center  focus-within:border-blue-600",
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
            htmlFor="taskStatus"
            className="block text-sm font-medium leading-6 text-gray-400"
          >
            Status
          </label>

          <RadioGroup
            className="mt-2 grid gap-4 grid-cols-1 md:grid-cols-2"
            name="status"
            id="taskStatus"
            value={selectedStatus}
            onChange={setSelectedStatus}
          >
            {Object.entries(TASK_STATUS_STYLES).map(
              ([statusKey, statusStyles]) =>
                statusStyles.label &&
                statusStyles.icon && (
                  <Field
                    key={statusKey}
                    className={clsx(
                      "border-2 rounded-lg cursor-pointer hover:scale-105 duration-100 ease-in-out focus-within:border-2 focus-within:border-blue-600",
                      {
                        "border-blue-500": selectedStatus === statusKey,
                        "border-gray-200": selectedStatus !== statusKey,
                      }
                    )}
                    onClick={() =>
                      setSelectedStatus(
                        selectedStatus === statusKey
                          ? undefined
                          : (statusKey as TaskStatus)
                      )
                    }
                  >
                    <Radio value={statusKey} />

                    <Label className="cursor-pointer justify-between flex h-full items-center">
                      <div className="flex gap-2 items-center">
                        <div
                          className={clsx(
                            "h-10 w-10 m-1 rounded-md flex justify-center",
                            "bg-" + statusStyles.iconBackgroundColor
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
