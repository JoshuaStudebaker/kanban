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
  //lets find all the Comments and remove them by TaskId
  let listOrBoardId = "";

  if (this._conditions.listId) {
    Promise.all([
      //something like...
      // @ts-ignore
      dbContext.Comments.deleteMany({
        // @ts-ignore
        // // // @ts-ignore

        listId: this._conditions.listId,
        // boardId: this._conditions.boardId,
        // taskId: this._conditions._id,
      }),
    ])
      .then(() => next())
      .catch((err) => next(err));
  } else
    Promise.all([
      //something like...
      // @ts-ignore
      dbContext.Comments.deleteMany({
        // @ts-ignore
        // // // @ts-ignore

        // listId: this._conditions.listId,
        boardId: this._conditions.boardId,
        // taskId: this._conditions._id,
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
