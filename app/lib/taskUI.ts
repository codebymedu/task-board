import { TaskStatus } from "./types";

export const TASK_ICONS: Record<number, string> = {
  1: "🖥️",
  2: "💬",
  3: "☕",
  4: "🏋️‍♂️",
  5: "📚",
  6: "⏰",
};

export const TASK_STATUS_STYLES: Record<
  TaskStatus | "toDo",
  {
    backgroundColor: string;
    icon?: string;
    iconBackgroundColor?: string;
    label?: string;
  }
> = {
  completed: {
    label: "Completed",
    backgroundColor: "completed",
    iconBackgroundColor: "completed-icon",
    icon: "/icons/Done_round_duotone.svg",
  },
  inProgress: {
    label: "In Progress",
    backgroundColor: "in-progress",
    iconBackgroundColor: "in-progress-icon",
    icon: "/icons/Time_atack_duotone.svg",
  },
  willNotDo: {
    label: "Won't do",
    backgroundColor: "will-not-do",
    iconBackgroundColor: "will-not-do-icon",
    icon: "/icons/close_ring_duotone.svg",
  },
  toDo: {
    backgroundColor: "to-do",
  },
};
