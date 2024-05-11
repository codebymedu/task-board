const { db } = require("@vercel/postgres");

async function createTaskboards(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS taskboards (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;
    console.log("Created 'taskboards' table");
    return createTable;
  } catch (error) {
    console.error("Error creating 'taskboards' table:", error);
  }
}

async function createTasks(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        task_board_id INT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(255),
        status VARCHAR(50),
        CONSTRAINT fk_taskboards
          FOREIGN KEY (task_board_id) 
          REFERENCES taskboards(id)
      );
    `;
    console.log("Created 'tasks' table");
    return createTable;
  } catch (error) {
    console.error("Error creating 'tasks' table:", error);
  }
}

async function main() {
  const client = await db.connect();

  await createTaskboards(client);
  await createTasks(client);

  await client.end();
}

main().catch((error) => {
  console.error(
    "An error occurred while attempting to create the database:",
    error
  );
});
