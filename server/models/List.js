import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
import { dbContext } from "../db/DbContext";

const List = new Schema(
  {
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

List.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

// CASCADE ON DELETE
List.pre("deleteMany", function (next) {
  //lets find all the tasks and remove them
  Promise.all([
    // @ts-ignore
    dbContext.Tasks.deleteMany({ boardId: this._conditions.boardId }),
  ])
    .then(() => next())
    .catch((err) => next(err));
});

//CASCADE ON DELETE
List.pre("findOneAndRemove", function (next) {
  //lets find all the lists and remove them
  // @ts-ignore
  Promise.all([
    // @ts-ignore
    dbContext.Tasks.deleteMany({ listId: this._conditions._id }),
  ])
    .then(() => next())
    .catch((err) => next(err));
});

export default List;
