const Task = require("../models/Task.js");
var mongoose = require("mongoose");
const addTask = async (req, res, next) => {
  const {
    taskName,
    description,
    dueDate,
    allocatedTo,
    createdBy,
    createdAt,
    fileUrl,
  } = req.body;
  let task;
  console.log(req.body);
  try {
    var userId = mongoose.mongo.ObjectId(req.user.id);
    task = new Task({
      taskName,
      description,
      dueDate,
      allocatedTo,
      createdBy,
      fileUrl,
      createdAt,
      user: userId,
      state: "Ongoing",
      status: "Created",
    });

    console.log("Title", req.body);
    console.log("req.body.user", req.body.userData);
    console.log("req.user.id", req.user.id);
    req.body.userData = req.user.id;
    console.log(req.user);
    await task.save();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  // if (!task) {
  //     return res
  //       .status(500)
  //       .json({ message: "Unauthorized user Unable To Add Task" });
  //   }
  // return res.status(201).json({ task });
  if (!task && req.user.role !== "superadmin") {
    return res
      .status(500)
      .json({ message: "Unauthorized user Unable To Add Task" });
  }
  return res.status(201).json({ task });
};

const getAllTasks = async (req, res) => {
  let tasks, completed, onGoing, overDue, count, countU, countD;
  const userRole = req.user.role;
  const userId = req.user._id;
  const { state } = req.query;

  const startOfCurrentMonth = new Date();
  startOfCurrentMonth.setDate(1);
  const startOfNextMonth = new Date();
  startOfNextMonth.setDate(1);
  startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

  const task = Task;

  try {
    completed = await task.aggregate([
      {
        $match: {
          lastUpdatedOn: {
            $gte: startOfCurrentMonth,
            $lte: startOfNextMonth
          },
          state: 'Completed'
        }
      },
      {
        $group: {
          // _id: {$month: '$createdAt'},
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]).exec();
    if (completed.length === 0) {
      completed = [{ _id: null, count: 0 }];
    }
    //console.log(`Number of Completed Tasks ${JSON.stringify(completed)}`);
    onGoing = await task.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfCurrentMonth,
            $lte: startOfNextMonth
          },
          state: 'Ongoing'
        }
      },
      {
        $group: {
          // _id: {$month: '$createdAt'},
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]).exec();
    if (onGoing.length === 0) {
      onGoing = [{ _id: null, count: 0 }];
    }
    //console.log(`Number of Ongoing Tasks ${JSON.stringify(onGoing)}`);
    overDue = await task.aggregate([
      {
        $match: {
          lastUpdatedOn: {
            $gte: startOfCurrentMonth,
            $lte: startOfNextMonth
          },
          state: 'Overdue'
        }
      },
      {
        $group: {
          // _id: {$month: '$createdAt'},
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]).exec();
    if (overDue.length === 0) {
      overDue = [{ _id: null, count: 0 }];
    }
    //console.log(`Number of Overdue Tasks ${JSON.stringify(overDue)}`);
    tasks = await Task.find({ state: ['Completed', 'Ongoing'] }).populate({ path: 'allocatedTo', select: 'name' });
    //console.log(tasks);
    //count = await Task.countDocuments({ state: 'Completed' });
    //console.log(`Number of Task Completed: ${count}`);
    //countU = await Task.countDocuments({ state: 'Ongoing' });
    //console.log(`Number of Total Task : ${countU}`);
    //countD = await Task.countDocuments({ state: 'Overdue' });
    //console.log(`Number of Task OverDue : ${countD}`);
    if (userRole === "user") {
      if (state === "Self") {
        tasks = await Task.find({
          user: userId,
          state: {
            $nin: ["Cancelled"],
          },
        });
      }
      if (state === "AllocatedToYou") {
        tasks = await Task.find({
          allocatedTo: userId,
          state: {
            $nin: ["Cancelled", "Completed"],
          },
        });
      }
      if (state === "Completed") {
        tasks = await Task.find({
          user: userId,
          state: {
            $in: ["Completed"],
          },
        });
      }
      if (state === "Canceled") {
        tasks = await Task.find({
          allocatedTo: userId,
          state: {
            $in: ["Cancelled"],
          },
        });
      }
    }
    if (
      userRole === "localarea" ||
      userRole === "districtlevel" ||
      userRole === "statelevel"
    ) {
      console.log("sds");
      if (state === "Self") {
        tasks = await Task.find({
          user: userId,
          state: {
            $nin: ["Cancelled"],
          },
        });
      }
      if (state === "AllocatedToYou") {
        tasks = await Task.find({
          allocatedTo: userId,
          state: {
            $nin: ["Cancelled", "Completed"],
          },
        });
      }
      if (state === "Ongoing") {
        tasks = await Task.find({
          user: userId,
          state: {
            $in: ["Ongoing"],
          },
        });
      }
      if (state === "Completed") {
        tasks = await Task.find({
          user: userId,
          state: {
            $in: ["Completed"],
          },
        });
      }
      if (state === "Overdue") {
        tasks = await Task.find({
          user: userId,
          state: {
            $in: ["Overdue"],
          },
        });
      }
      if (state === "Canceled") {
        tasks = await Task.find({
          user: userId,
          state: {
            $in: ["Cancelled"],
          },
        });
      }
    }
    if (userRole === "admin" || userRole === "superadmin") {
      if (state === "Self") {
        tasks = await Task.find({
          user: userId,
          state: {
            $nin: ["Cancelled"],
          },
        });
        
      }
      if (state === "AllocatedToYou") {
        if (userRole === "admin") {
          tasks = await Task.find({
            allocatedTo: userId,
            state: {
              $nin: ["Cancelled", "Completed"],
            },
          });
        }
      }
      if (state === "Ongoing") {
        tasks = await Task.find({
          state: {
            $in: ["Ongoing"],
          },
        });
      }
      if (state === "Completed") {
        tasks = await Task.find({
          state: {
            $in: ["Completed"],
          },
        });
      }
      if (state === "Overdue") {
        tasks = await Task.find({
          state: {
            $in: ["Overdue"],
          },
        });
      }
      if (state === "Canceled") {
        tasks = await Task.find({
          state: {
            $in: ["Cancelled"],
          },
        });
      }
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
  if (!tasks) {
    return res.status(404).json({ message: "No Tasks found" });
  }
  return res.status(200).json({ 
    tasks,
    completedTasks : completed, 
    onGoingTasks : onGoing,
    overdueTasks : overDue,
    // completedTask : count, 
    // totalTask : countU, 
    // taskOverdue : countD 
  });
};

const getById = async (req, res) => {
  let task;
  try {
    task = await Task.findById(req.params.id);
  } catch (err) {
    console.log(err);
  }

  if (!task) {
    return res.status(404).json({ message: "No Tasks found" });
  }
  return res.status(200).json({ task });
};

const updateTask = async (req, res, next) => {
  const id = req.params.id;
  const {
    taskName,
    description,
    dueDate,
    allocatedTo,
    lastUpdateBy,
    lastUpdatedOn,
    state,
    reportDescription,
    reportUrl,
  } = req.body;

  let task;
  try {
    task = await Task.findByIdAndUpdate(
      id,
      {
        taskName,
        description,
        dueDate,
        allocatedTo,
        lastUpdateBy,
        lastUpdatedOn,
        reportDescription,
        state,
        reportUrl,
      },
      { new: true }
    );
    req.body.user = req.user.id;
    console.log(task);
    task = await task.save();
  } catch (err) {
    console.log(err);
  }
  if (!task && req.user.role !== "superadmin") {
    return res
      .status(500)
      .json({ message: "Unauthorized user Unable To Update By this ID" });
  }
  return res.status(201).json({ task });
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  let task;
  try {
    task = await Task.findByIdAndRemove(id);
  } catch (err) {
    return res.status(404).json({ message: `Pask Not found` });
  }
  return res.status(201).json({ message: "Pask Successfully Deleted" });
};

const cancelTask = async (req, res) => {
  const id = req.params.id;
  let task;
  try {
    task = await Task.findByIdAndUpdate(id, {
      state: "Cancelled",
    });
  } catch (err) {
    return res.status(404).json({ message: `Task Not found` });
  }
  return res.status(201).json({ message: "Task Successfully Cancelled" });
};

const completeTask = async (req, res) => {
  const id = req.params.id;
  let task;
  try {
    task = await Task.findByIdAndUpdate(id, {
      state: "Completed",
      status: "ApprovedCreator",
    });
  } catch (err) {
    return res.status(404).json({ message: `Task Not found` });
  }
  return res.status(201).json({ message: "Task Successfully Completed" });
};

exports.addTask = addTask;
exports.getAllTasks = getAllTasks;
exports.getById = getById;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.cancelTask = cancelTask;
exports.completeTask = completeTask;
