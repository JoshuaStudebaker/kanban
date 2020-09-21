import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Task = new Schema(
  {
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    listId: { type: ObjectId, ref: "List", required: true },
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
  //lets find all the Tasks and remove them
  Promise.all([
    //something like...
    //dbContext.Comment.deleteMany({ TaskId: this._conditions_id }),
  ])
    .then(() => next())
    .catch((err) => next(err));
});

//CASCADE ON DELETE
Task.pre("findOneAndRemove", function (next) {
  //lets find all the tasks and remove them
  Promise.all([
    // REVIEW check if ({TaskId or ListId or BoardId})
    // dbContext.Comment.deleteMany({ TaskId: this._conditions._id })
  ])
    .then(() => next())
    .catch((err) => next(err));
});

export default Task;
