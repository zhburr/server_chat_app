import { connect } from "mongoose";

export async function dbConnect(url: string) {
  try {
    await connect(url);
    console.log("Connection successful");
  } catch (error) {
    console.log(error);
  }
}
