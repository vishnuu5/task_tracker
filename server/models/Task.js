import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

// Set completedAt date when status changes to 'Completed'
taskSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status === "Completed") {
    this.completedAt = new Date();
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
