import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();

const connectDb = {
  // user: process.env.PGUSER,
  // host: process.env.PGHOST,
  // database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
  // ssl: true,
  databaseurl: process.env.PGDATABASE_URL,
};
const db = pgPromise()(connectDb);
// console.log(db.connect());
if (process.env.PGDATABASE_URL) {
  console.log("DATABASE_URL is set:");
} else {
  console.log("DATABASE_URL is not set.");
}
db.connect();
export default db;
