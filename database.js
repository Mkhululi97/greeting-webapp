import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();
const connectDb = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  database_url: process.env.PGDATABASE_URL,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: true,
};

const db = pgPromise()(connectDb);
export default db;
