// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   description: { type: String, required: true },
//   staffIds: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
//   ],
//   adminId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin",
//     required: true,
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
// export default Task;

// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
//   assignedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     refPath: "assignedByModel",
//     required: true,
//   },
//   assignedByModel: {
//     type: String,
//     enum: ["Admin", "Staff"],
//     required: true,
//   },
//   department: {
//     type: String,
//     enum: ["Ground Staff", "Security", "Maintenance", "Other"],
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "In Progress", "Completed", "Rejected"],
//     default: "Pending",
//   },
//   createdAt: { type: Date, default: Date.now },
//   startedAt: { type: Date },
//   completedAt: { type: Date },
//   rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
//   rejectionReason: String,
// });

// // Validate that only admins assign to team leaders, and team leaders to team members
// taskSchema.pre("save", async function (next) {
//   const Staff = mongoose.models.Staff;
//   const Admin = mongoose.models.Admin;
//   const assignedTo = await Staff.findById(this.assignedTo);

//   if (!assignedTo || assignedTo.role !== this.department) {
//     return next(
//       new Error("Assigned staff must belong to the task's department")
//     );
//   }

//   let assignedBy;
//   if (this.assignedByModel === "Admin") {
//     assignedBy = await Admin.findById(this.assignedBy);
//   } else {
//     assignedBy = await Staff.findById(this.assignedBy);
//   }

//   if (!assignedBy) {
//     return next(new Error("Assigned by user not found"));
//   }

//   const isAdmin = this.assignedByModel === "Admin";
//   const isTeamLeader =
//     this.assignedByModel === "Staff" &&
//     assignedBy.isTeamLeader &&
//     assignedBy.role === this.department;

//   if (isAdmin && !assignedTo.isTeamLeader) {
//     return next(new Error("Admins can only assign tasks to team leaders"));
//   } else if (isTeamLeader && assignedTo.isTeamLeader) {
//     return next(
//       new Error("Team leaders cannot assign tasks to other team leaders")
//     );
//   } else if (!isAdmin && !isTeamLeader) {
//     return next(new Error("Only admins or team leaders can assign tasks"));
//   }

//   next();
// });

// // Notify the assigned staff
// taskSchema.post("save", async function (doc) {
//   const Notification = mongoose.models.Notification;
//   await Notification.create({
//     taskId: doc._id,
//     userId: doc.assignedTo,
//     userModel: "Staff",
//     text: `You have been assigned a new task by admin: ${doc.title}`,
//     read: false,
//   });
// });

// const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
// export default Task;

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }, // Initial assignee (team leader)
  finalAssignee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }], // Teammates assigned by team leader
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "assignedByModel",
    required: true,
  },
  assignedByModel: {
    type: String,
    enum: ["Admin", "Staff"],
    required: true,
  },
  department: {
    type: String,
    enum: ["Ground Staff", "Security", "Maintenance", "Other"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  startedAt: { type: Date },
  completedAt: { type: Date },
  rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  rejectionReason: String,
});

// Validate assignedTo and finalAssignee
taskSchema.pre("save", async function (next) {
  const Staff = mongoose.models.Staff;

  // Validate assignedTo
  const assignedTo = await Staff.findById(this.assignedTo);
  if (!assignedTo || assignedTo.role !== this.department) {
    return next(
      new Error("Assigned staff must belong to the task's department")
    );
  }

  // Validate finalAssignee if present
  if (this.finalAssignee && this.finalAssignee.length > 0) {
    const finalAssignees = await Staff.find({
      _id: { $in: this.finalAssignee },
    });
    if (finalAssignees.length !== this.finalAssignee.length) {
      return next(new Error("Some final assignees are invalid"));
    }
    for (const assignee of finalAssignees) {
      if (assignee.role !== this.department) {
        return next(
          new Error("Final assignees must belong to the task's department")
        );
      }
      if (assignee.isTeamLeader) {
        return next(
          new Error("Team leaders cannot be assigned as final assignees")
        );
      }
    }
  }

  next();
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
