import mongoose from "mongoose";
import { dbContext } from "../db/DbContext";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Comment = new Schema(
  {
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    taskId: { type: ObjectId, ref: "Task", required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
    listId: { type: ObjectId, ref: "List", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

//CASCADE ON DELETE
// Comment.pre("deleteMany", function (next) {
//   //lets find all the Comments and remove them
//   Promise.all([
//     dbContext.Comments.deleteMany({
//       // @ts-ignore
//       boardId: this._conditions.boardId,
//       // @ts-ignore
//       listId: this._conditions.listId,
//       // @ts-ignore
//       taskId: this._conditions.taskId,
//     }),
//   ])
//     .then(() => next())
//     .catch((err) => next(err));
// });

// //CASCADE ON DELETE
// Comment.pre("findOneAndRemove", function (next) {
//   //lets find all the Comments and remove them
//   Promise.all([
//     // REVIEW check if ({CommentId or ListId or BoardId})
//     // dbContext.Comment.deleteMany({ CommentId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch((err) => next(err));
// });

export default Comment;
