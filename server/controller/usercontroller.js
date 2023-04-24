const User = require("../models/User.js");
const ErrorResponse = require("../utils/errorResponse");
const jwt_decode = require("jwt-decode");
const mongoose = require('mongoose');
const db = mongoose.connection;


const addUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  let user;
  try {
    user = new User({
      name,
      email,
      password,
      role,
    });
    console.log(user);
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "Unable to Add User" });
  }
  return res.status(200).json({ users });
};
const getAllUsers = async (req, res) => {
  let users, countD, countU;
  //const { role } = req.query;
  try {
    users = await User.find();
    //console.log(users)
    countD = await User.countDocuments({ role: 'designers' });
    //console.log(`Number of users with "designers" role: ${countD}`);
    countU = await User.countDocuments();
    //console.log(`Number of users : ${countU}`);
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users found" });
  }
  return res.status(200).json({ users, designersCount: countD, newCount : countU });
};

const getById = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "No User found" });
  }
  return res.status(200).json({ user });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password, role } = req.body;

  let user;
  try {
    user = await User.findByIdAndUpdate(
      id,
      { name, email, password, role },
      { new: true }
    );

    user = await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "User Successfully Deleted" });
};

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
  });
};

async function extractToken(req) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

const currentUser = async (req, res) => {
  try {
    const token = await extractToken(req);
    var decoded = await jwt_decode(token);
    var user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "Access!" });
    }
  } catch (error) {
    return res.status(400).json({ message: "You are not authorized!" });
  }
  return res.status(200).send(user);
};

// const getUsersBasedOnRole = async (req, res) => {
//   let users;
//   const userRole = req.user.role;
//   const currentUserId = req.user._id;
//   try {
//     if (userRole === "superadmin") {
//       users = await User.find({
//         _id: { $ne: currentUserId },
//         role: { $nin: ["superadmin"] },
//       }).select("-password");
//     }
//     if (userRole === "admin") {
//       users = await User.find({
//         _id: { $ne: currentUserId },
//         role: { $nin: ["superadmin", "admin"] },
//       }).select("-password");
//     }

//     if (userRole === "statelevel") {
//       users = await User.find({
//         _id: { $ne: currentUserId },
//         role: { $nin: ["superadmin", "admin", "statelevel"] },
//       }).select("-password");
//     }

//     if (userRole === "districtlevel") {
//       users = await User.find({
//         _id: { $ne: currentUserId },
//         role: { $nin: ["superadmin", "admin", "statelevel", "districtlevel"] },
//       }).select("-password");
//     }

//     if (userRole === "localarea" || userRole === "user") {
//       users = await User.find({
//         _id: { $ne: currentUserId },
//         role: {
//           $eq: "user",
//         },
//       }).select("-password");
//     }
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
//   if (!users) {
//     return res.status(404).json({ message: "No Users found" });
//   }
//   return res.status(200).json({ users });
// };

const getUsersCount = async (req, res) => {
  let users;
  //const { role } = req.query;
  try {
    users = await User.find();
    console.log(users)
   users = await User.countDocuments({ role: 'designers' });
    console.log(`Number of users with "designers" role: ${count}`);
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users found" });
  }
  return res.status(200).json({ users });
};

exports.addUser = addUser;
exports.getAllUsers = getAllUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.sendTokenResponse = sendTokenResponse;
exports.currentUser = currentUser;
//exports.getUsersBasedOnRole = getUsersBasedOnRole;
exports.getUsersCount = getUsersCount;
