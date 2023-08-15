import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();
const connectDb = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: true,
};

const db = pgPromise()(connectDb);
db.connect();
export default db;
