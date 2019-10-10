import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

export type TaskDocument = mongoose.Document & {
  title: string;
  creator: string;
  information: string;
  dudDate: Date;
  completed: boolean;
};

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    creator: {
      type: String,
      required: true
    },
    information: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      required: false
    },
    completed: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<TaskDocument>("Task", TaskSchema);
