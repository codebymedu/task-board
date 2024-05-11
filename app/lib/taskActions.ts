import { TaskFormState } from "@/app/lib/types";
import { z } from "zod";

// --- FORM VALIDATIONS ---

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "Please give your task a name" })
    .min(3, "Please give your task a name longer than 3 character")
    .max(64, "Please give your task a name shorter than 64 character"),
  description: z.string().max(250),
  icon: z.coerce.number().default(1),
  status: z.enum(["completed", "inProgress", "willNotDo"]),
});

const CreateTask = FormSchema.omit({ id: true });
const EditTask = FormSchema.omit({ id: true });

// --- CRUD ACTIONS ---

export const createTask = (
  prevState: TaskFormState,
  taskFormData: FormData
): TaskFormState => {
  const validatedFields = CreateTask.safeParse({
    name: taskFormData.get("name"),
    description: taskFormData.get("description"),
    icon: taskFormData.get("icon"),
    status: taskFormData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create a new task.",
    };
  }

  const { icon, name, description, status } = validatedFields.data;

  try {
    // SQL HERE TO CREATE TASK
  } catch (error) {
    return { message: "Database Error." };
  }

  //   Revalidate & Close Modal
  return {};
};

export const editTask = (
  prevState: TaskFormState,
  taskFormData: FormData
): TaskFormState => {
  const validatedFields = EditTask.safeParse({
    name: taskFormData.get("name"),
    description: taskFormData.get("description"),
    icon: taskFormData.get("icon"),
    status: taskFormData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to edit your task.",
    };
  }

  const { icon, name, description, status } = validatedFields.data;

  try {
    // SQL HERE TO EDIT TASK
  } catch (error) {
    return { message: "Database Error." };
  }

  //   Revalidate & Close Modal
  return {};
};

export const deleteTask = (taskId: number) => ({});
