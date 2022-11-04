import app from "./app";
import dotenv from "dotenv";
import { dbConnect } from "./config/db";

dotenv.config();

dbConnect(process.env.CONNECTION_URL || "");

const port: number | string = process.env.PORT || 50001;

app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
