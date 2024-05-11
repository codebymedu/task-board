"use server";

import { sql } from "@vercel/postgres";
import { Taskboard } from "@/app/lib/types";

export const createTaskboard = async (taskboardName = "My Task Board") => {
  try {
    const insertResult = await sql`
          INSERT INTO taskboards (name)
          VALUES (${taskboardName})
          RETURNING id;
        `;

    return insertResult.rows[0].id;
  } catch (error) {
    console.error("Error creating new taskboard:", error);
  }
};

export const fetchTaskboard = async (
  taskboardId: number
): Promise<Taskboard | undefined> => {
  try {
    const selectResult =
      await sql`SELECT name FROM taskboards WHERE id=${taskboardId};`;

    return selectResult.rows[0] as Taskboard;
  } catch (error) {
    console.error("Error getting new taskboard:", error);
  }
};
