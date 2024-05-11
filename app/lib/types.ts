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
