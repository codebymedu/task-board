export type TaskFormFields = {
  name: string;
  description: string;
  icon?: string;
  status?: string;
};

export type TaskFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    icon?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type TaskStatus = "completed" | "inProgress" | "willNotDo";

export type Taskboard = { name: string };

export type Task = {
  name: string;
  description: string;
  icon: number;
  status: string | null;
};
