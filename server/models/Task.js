import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
import { dbContext } from "../db/DbContext";

const Task = new Schema(
  {
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    listId: { type: ObjectId, ref: "List", required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Task.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

//CASCADE ON DELETE
Task.pre("deleteMany", function (next) {
  // @ts-ignore
  if (this._conditions.listId) {
    Promise.all([
      // @ts-ignore
      dbContext.Comments.deleteMany({
        // @ts-ignore
        listId: this._conditions.listId,
      }),
    ])
      .then(() => next())
      .catch((err) => next(err));
  } else
    Promise.all([
      // @ts-ignore
      dbContext.Comments.deleteMany({
        // @ts-ignore
        boardId: this._conditions.boardId,
      }),
    ])
      .then(() => next())
      .catch((err) => next(err));
});

//CASCADE ON DELETE
Task.pre("findOneAndRemove", function (next) {
  //lets find all the tasks and remove them
  Promise.all([
    // REVIEW check if ({TaskId or ListId or BoardId})
    // @ts-ignore
    dbContext.Comments.deleteMany({ taskId: this._conditions._id }),
  ])
    .then(() => next())
    .catch((err) => next(err));
});

export default Task;
