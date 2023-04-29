const Project = require("../models/Project.js");
var mongoose = require("mongoose");
const addProject = async (req, res, next) => {
  const {
    title,
    projectDescription,
    sampleImage,
    dueDate1,
    dueDate2,
    compulsoryWordings,
    colors,
    leaderPhoto,
    //allotedFile,
    approvedStatus,
    createdBy,
    createdAt,
    fileUrl,
  } = req.body;
  let project;
  try {
    var userId = mongoose.mongo.ObjectId(req.user.id);
    project = new Project({
      title,
      projectDescription,
      sampleImage,
      dueDate1,
      dueDate2,
      compulsoryWordings,
      colors,
      leaderPhoto,
      user: userId,
      state: "InProgress",
      //allotedFile,
      status: "Created",
      approvedStatus,
      createdAt,
      fileUrl,
    });

    console.log("Title", req.body);
    console.log("req.body.user", req.body.userData);
    console.log("req.user.id", req.user.id);
    req.body.userData = req.user.id;
    console.log(req.user);
    await project.save();
  } catch (err) {
    console.log(err);
  }
  if (!project && req.user.role !== "superadmin") {
    return res
      .status(500)
      .json({ message: "Unauthorized user Unable To Add Project" });
  }
  return res.status(201).json({ project });
};

const getAllProjects = async (req, res) => {
  let result, activeResult, inProgressProjects, projects, completed, canceled, count, onGoing, overDue, countU, countD, countC;
  let { state } = req.query;
  var userId = mongoose.mongo.ObjectId(req.user.id);

  const startOfCurrentMonth = new Date();
  startOfCurrentMonth.setDate(1);
  const startOfNextMonth = new Date();
  startOfNextMonth.setDate(1);
  startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);


  const project = Project;
try {
result = await
project.aggregate([
{
$match: { state: 'Completed'}
},
{
$group: {
_id: {$month: '$lastUpdatedOn'},
count: { $sum: 1 }
}
}
]);
//console.log(result);
activeResult = await
project.aggregate([
{
$match: { state: 'InProgress'}
},
{
$group: {
_id: {$month: '$createdAt'},
count: { $sum: 1 }
}
}
]);
//console.log(activeResult);
projects = await Project.find();
completed = await project.aggregate([
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
//console.log(`Number of Completed Projects ${JSON.stringify(completed)}`);
onGoing = await project.aggregate([
  {
    $match: {
      createdAt: {
        $gte: startOfCurrentMonth,
        $lte: startOfNextMonth
      },
      state: 'InProgress'
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
//console.log(`Number of Ongoing Projects ${JSON.stringify(onGoing)}`);
overDue = await project.aggregate([
  {
    $match: {
      dueDate2: {
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
//console.log(`Number of Overdue Projects ${JSON.stringify(overDue)}`);

// console.log(startOfCurrentMonth);
// console.log(startOfNextMonth);
canceled = await project.aggregate([
  {
    $match: {
      lastUpdatedOn: {
        $gte: startOfCurrentMonth,
        $lte: startOfNextMonth
      },
      state: 'Canceled' 
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
if (canceled.length === 0) {
  canceled = [{ _id: null, count: 0 }];
}
//console.log(`Number of Canceled Projects ${JSON.stringify(canceled)}`);
// console.log(startOfCurrentMonth);
// console.log(startOfNextMonth);
    inProgressProjects = await Project.find({ state: 'InProgress' });
    //console.log(inProgressProjects);
    //count = await Project.countDocuments({ state: 'Completed' });
    // console.log(`Number of Project Completed: ${count}`);
    //countU = await Project.countDocuments({ state: 'InProgress' });
    //console.log(`Number of Active Project : ${countU}`);
    //countD = await Project.countDocuments({ state: 'Overdue' });
    //console.log(`Number of Project OverDue : ${countD}`);
    //countC = await Project.countDocuments({ state: 'Canceled' });
    //console.log(`Number of Project Canceled : ${countC}`);
    if (req.user.role == "user") {
      if (state === "Self") {
        projects = await Project.find({
          user: { $in: [req.user._id] },
          state: { $nin: ["Canceled"] },
        });
      } else {
        projects = await Project.find({
          user: { $in: [req.user._id] },
          state: {
            $in: [state],
          },
        });
      }
    } else if (req.user.role == "designchecker") {
      if (state === "Self") {
        projects = await Project.find({
          approvedBy: { $in: [req.user._id] },
          state: { $nin: ["Canceled"] },
        });
      } else if (state === "Completed") {
        projects = await Project.find({
          state: { $in: [state] },
          approvedBy: { $in: [req.user._id] },
        });
      } else {
        projects = await Project.find({
          status: {
            $in: ["SubmittedDesigner", "ApprovedPChecker", "ProcessCheckers"],
          },
          state: { $in: [state] },
        });
      }
    } else if (req.user.role === "designers") {
      if (state === "Self") {
        projects = await Project.find({
          approvedBy: { $in: [req.user._id] },
          state: { $nin: ["Canceled"] },
        });
      } else {
        projects = await Project.find({
          state: { $in: [state] },
        });
      }
    } else if (req.user.role == "proofchecker") {
      if (state === "Self") {
        projects = await Project.find({
          approvedBy: { $in: [req.user._id] },
          state: { $nin: ["Canceled"] },
        });
      } else if (state === "Completed") {
        projects = await Project.find({
          state: { $in: [state] },
          approvedBy: { $in: [req.user._id] },
        });
        console.log(projects);
      } else {
        projects = await Project.find({
          status: {
            $in: ["SubmittedDesigner", "ApprovedDChecker", "ProcessCheckers"],
          },
          state: { $in: [state] },
        });
      }
    } else {
      if (state === "Self") {
        projects = await Project.find({
          user: req.user._id,
          state: { $nin: ["Canceled"] },
        });
      } else {
        projects = await Project.find({
          state: { $in: [state] },
        });
      }
    }
  } catch (err) {
    console.log(err);
  }

  if (!projects) {
    return res.status(404).json({ message: "No Projects found" });
  }
  
  return res.status(200)
  .json({
     countByMonth : result,
     countByActive : activeResult,
     inProgressProjects, 
     projects, 
     //completed : count,
     completedProjects : completed,
     onGoingProjects: onGoing,
     overdueProjects: overDue,
     canceledProjects: canceled,
     //totalProject : countU, 
     //projectOverdue : countD,
     //canceledProject : countC, 
    });
};

const getActiveProjects = async (req, res) => {

  
    let result  
    
    try {
  result = await
  Project.aggregate([
  {
  $match: { state: 'Completed'}
  },
  {
  $group: {
  _id: {$month: '$lastUpdatedOn'},
  count: { $sum: 1 }
  }
  }
  ]);
  console.log(result);
} catch (err) {
  console.log(err);
}
};
  //let projects, count, activeProjects;
  
  // try {
  //   projects = await Project.find({ state: 'InProgress' });
  //   console.log(projects);
  // count = await Project.countDocuments({ state: 'InProgress' });
  // console.log(`Number of Active Projects: ${count}`);
  // // activeProjects = await Project.find({ state: 'InProgress' });
  // // console.log(activeProjects);
  // } catch (err) {
  //   console.log(err);
  // }

  // if (!projects) {
  //   return res.status(404).json({ message: "No projects found" });
  // }
  //return res.status(200).json({ projects, projectCount : count});



const getById = async (req, res) => {
  let project;
  try {
    project = await Project.findById(req.params.id);
  } catch (err) {
    console.log(err);
  }

  if (!project) {
    return res.status(404).json({ message: "No Projects found" });
  }
  return res.status(200).json({ project });
};

const updateProject = async (req, res, next) => {
  const id = req.params.id;
  const {
    title,
    projectDescription,
    sampleImage,
    dueDate1,
    dueDate2,
    compulsoryWordings,
    colors,
    leaderPhoto,
    status,
    allotedFile,
    approvedStatus,
    lastUpdateBy,
    lastUpdatedOn,
  } = req.body;

  let project;
  try {
    project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        projectDescription,
        sampleImage,
        dueDate1,
        dueDate2,
        compulsoryWordings,
        colors,
        leaderPhoto,
        status,
        allotedFile,
        approvedStatus,
        lastUpdateBy,
        lastUpdatedOn,
      },
      { new: true }
    );
    req.body.user = req.user.id;
    console.log(project);
    project = await project.save();
  } catch (err) {
    console.log(err);
  }
  if (!project && req.user.role !== "superadmin") {
    return res
      .status(500)
      .json({ message: "Unauthorized user Unable To Update By this ID" });
  }
  return res.status(201).json({ project });
};

const cancelProject = async (req, res) => {
  const id = req.params.id;
  try {
    project = await Project.findByIdAndUpdate(id, {
      state: "Canceled",
    });
  } catch (err) {
    return res.status(404).json({ message: `Project Not found` });
  }
  return res.status(201).json({ message: "Project Successfully Canceled" });
};

const deleteProject = async (req, res) => {
  const id = req.params.id;
  let project;
  try {
    project = await Project.findByIdAndRemove(id);
  } catch (err) {
    return res.status(404).json({ message: `Project Not found` });
  }
  return res.status(201).json({ message: "Project Successfully Deleted" });
};

const createAllotedFile = async (req, res, next) => {
  const _id = req.params._id;
  const { designerName } = req.body;
  const allotedFile = {
    designerName,
  };

  const project = await Project.findById(projectId);

  console.log(project.allotedFile);

  /* if (isAlloted) {
      project.allotedFiles.forEach(allotedFile => {
          if (allotedFile.user.toString() === req.user._id.toString()) {
              allotedFile.designerName = designerName;
              
          }
      })

  } else {
      project.allotedFiles.push(allotedFile);
      project.numOfAllotedFiles = project.allotedFiles.length
  }*/
  await project.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

const getAllAllotedFiles = async (req, res) => {
  let allotedfiles;
  try {
    allotedfiles = await AllotedFile.find();
  } catch (err) {
    console.log(err);
  }

  if (!allotedfiles) {
    return res.status(404).json({ message: "No Alloted Files found" });
  }
  return res.status(200).json({ allotedfiles });
};

const updateFieldForSubmitting = async (req, res) => {
  const id = req.params.id;
  const currentUserId = req.user._id;
  try {
    if (req.user.role === "designers") {
      await Project.findByIdAndUpdate(id, {
        status: "SubmittedDesigner",
        state: "WaitForModification",
        $addToSet: {
          approvedBy: currentUserId,
        },
      });
    }
    if (req.user.role === "user") {
      const project = await Project.findById(id);
      if (project.status == "ApprovedPChecker" || "ApprovedDChecker") {
        await Project.findByIdAndUpdate(id, {
          state: "InProgress",
        });
      } else {
        await Project.findByIdAndUpdate(id, {
          state: "InProgress",
          status: "SubmittedDesigner",
        });
      }
    }
    if (req.user.role === "proofchecker") {
      const project = await Project.findById(id);
      if (project.status == "ApprovedDChecker") {
        await Project.findByIdAndUpdate(id, {
          status: "ApprovedDChecker&ApprovedCChecker",
          state: "Completed",
          $addToSet: {
            approvedBy: currentUserId,
          },
        });
      } else {
        await Project.findByIdAndUpdate(id, {
          status: "ApprovedPChecker",
          state: "InProgress",
          $addToSet: {
            approvedBy: currentUserId,
          },
        });
      }
    }
    if (req.user.role === "designchecker") {
      const project = await Project.findById(id);
      if (project.status == "ApprovedPChecker") {
        await Project.findByIdAndUpdate(id, {
          status: "ApprovedDChecker&ApprovedCChecker",
          state: "Completed",
          $addToSet: {
            approvedBy: currentUserId,
          },
        });
      } else {
        await Project.findByIdAndUpdate(id, {
          status: "ApprovedDChecker",
          state: "InProgress",
          $addToSet: {
            approvedBy: currentUserId,
          },
        });
      }
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
  return res.status(200).json({ msg: "successfully updated" });
};

const askForModification = async (req, res) => {
  const id = req.params.id;
  try {
    if (req.user.role === "user") {
      await Project.findByIdAndUpdate(id, {
        status: "ProcessDesigner",
        state: "InProgress",
      });
    }

    if (req.user.role === "proofchecker") {
      const project = await Project.findById(id);
      if (project.status === "ApprovedDChecker") {
        await Project.findByIdAndUpdate(id, {
          state: "WaitForModification",
        });
      } else {
        console.log("hebe");
        await Project.findByIdAndUpdate(id, {
          status: "ProcessCheckers",
          state: "WaitForModification",
        });
      }
    }
    if (req.user.role === "designsapprover") {
      const project = await Project.findById(id);
      if (project.status === "ApprovedPChecker") {
        await Project.findByIdAndUpdate(id, {
          state: "WaitForModification",
        });
      } else {
        await Project.findByIdAndUpdate(id, {
          status: "ProcessCheckers",
          state: "WaitForModification",
        });
      }
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
  return res.status(200).json({ msg: "successfully updated" });
};

exports.addProject = addProject;
exports.getAllProjects = getAllProjects;
exports.getById = getById;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.createAllotedFile = createAllotedFile;
exports.getAllAllotedFiles = getAllAllotedFiles;
exports.updateFieldForSubmitting = updateFieldForSubmitting;
exports.askForModification = askForModification;
exports.cancelProject = cancelProject;
exports.getActiveProjects = getActiveProjects;
