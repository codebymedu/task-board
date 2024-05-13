"use server";

import { sql } from "@vercel/postgres";
import { Taskboard } from "@/app/lib/types";
import { unstable_noStore as noStore } from "next/cache";

export const createTaskboard = async (name = "My Task Board") => {
  try {
    const insertResult = await sql`
          INSERT INTO taskboards (name)
          VALUES (${name})
          RETURNING id;
        `;

    return insertResult.rows[0].id;
  } catch (error) {
    console.error("Error creating new taskboard:", error);
  }
};

export const fetchTaskboard = async (
  id: number
): Promise<Taskboard | undefined> => {
  noStore();

  try {
    const selectResult = await sql`SELECT name FROM taskboards WHERE id=${id};`;

    return selectResult.rows[0] as Taskboard;
  } catch (error) {
    console.error("Error getting new taskboard:", error);
  }
};

export const updateTaskboardName = async (id: number, name: string) => {
  try {
    const updateResult =
      await sql`UPDATE taskboards SET name = ${name} WHERE id=${id};`;

    return updateResult.rows[0] as Taskboard;
  } catch (error) {
    console.error("Error updating taskboard name:", error);
  }
};
