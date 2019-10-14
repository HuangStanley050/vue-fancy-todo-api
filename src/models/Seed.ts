import Task from "../models/Task";
import mongoose from "mongoose";

declare var process: {
  env: {
    DB_URI: string;
  };
};
//console.log(process.env.DB_URI);
const databaseUri = process.env.DB_URI;
const seedFunction = async () => {
  for (let i = 0; i < 3; i++) {
    const task = new Task({
      title: "Seed stuff",
      information: "More seed",
      creator: "test",
      dueDate: new Date(),
      completed: false
    });
    await task.save();
  }
};
mongoose
  .connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Server started and is connected to database");
    seedFunction();
  })
  .catch(err => console.log(err));
