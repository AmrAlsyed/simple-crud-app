import pg from "pg";
import env from "dotenv";

env.config(); // Load environment variables from .env file
const { Client } = pg; // Destructure the Client class from pg

const db = new Client({
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL instead of separate variables
  ssl: process.env.DATABASE_URL.includes("railway")
    ? { rejectUnauthorized: false }
    : false, // Disable SSL if necessary (some PostgreSQL instances require this)
});

db.connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error", err.stack));

db.on("error", (err) => {
  console.error("Unexpected error on idle client " + err);
  process.exit(-1);
});

export const query = (text, params) => db.query(text, params);
