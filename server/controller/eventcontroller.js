const Event = require("../models/Events.js");
const moment = require("moment");
var mongoose = require("mongoose");

const addEvent = async (req, res, next) => {
  let { eventDate = new Date() } = req.body;
  const year = eventDate.getFullYear();
const month = (eventDate.getMonth() + 1).toString().padStart(2, '0');
const day = eventDate.getDate().toString().padStart(2, '0');
const formattedEventDate = `${year}-${month}-${day}`;
  if (!(eventDate instanceof Date)) {
    eventDate = new Date(eventDate);
  }
  const {
    eventName,
    eventCategory,
    //eventDate = new Date(),
    status,
    createdBy,
    createdAt,
    lastUpdateBy,
    lastUpdatedOn,
    description,
  } = req.body;
  
  
  //const dateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  let event;

  try {
    //var userId = mongoose.mongo.ObjectId(req.user._id);
    //const dateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    event = new Event({
      eventName,
      eventCategory,
      eventDate: formattedEventDate,
      status,
      createdBy,
      createdAt,
      lastUpdateBy,
      lastUpdatedOn,
      description,
  //    user: userId,
    });
    //req.body.user = req.user.id;
    console.log("Title", req.body);
    // console.log("req.body.user", req.body.userData);
    // console.log("req.user.id", req.user._id);
    // req.body.userData = req.user._id;
    // console.log(req.user);
    console.log(event);
    await event.save();
  } catch (err) {
    console.log(err);
  }
  // if (!event && req.user.role !== "user") {
  //   return res
  //     .status(500)
  //     .json({ message: "Unauthorized user Unable To Add Event" });
  // }
  // return res.status(201).json({ event });
  if (!event) {
    return res
      .status(500)
      .json({ message: "Unable To Add Event" });
  }
  return res.status(201).json({ event });
};

const getAllEvents = async (req, res) => {
  let events, specEvents;
  const date = new Date(req.params.date);
  try {
    specEvents = await Event.find({ eventDate: date });
    events = await Event.find();
  } catch (err) {
    console.log(err);
  }

  if (!events) {
    return res.status(404).json({ message: "No events found" });
  }
  return res.status(200).json({ events, specEvents });
};
const getEventsByDate = async (req, res) => {
  const date = new Date(req.params.date);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

  try {
    const events = await Event.find({
      eventDate: { $gte: start, $lt: end },
    });
    res.json(events);
  } catch (err) {
    console.log(err);
  }
};

const getById = async (req, res) => {
  let event;
  try {
    event = await Event.findById(req.params.id);
  } catch (err) {
    console.log(err);
  }

  if (!event) {
    return res.status(404).json({ message: "No events found" });
  }
  return res.status(200).json({ event });
};

const updateEvent = async (req, res, next) => {
  const id = req.params.id;
  const {
    eventName,
    eventCategory,
    eventDate,
    status,
    lastUpdateBy,
    lastUpdatedOn,
    description,
  } = req.body;

  let event;

  try {
    event = await Event.findByIdAndUpdate(
      id,
      {
        eventName,
        eventCategory,
        eventDate,
        status,
        lastUpdateBy,
        lastUpdatedOn,
        description,
      },
      { new: true }
    );

    req.body.user = req.user.id;
    event = await event.save();
  } catch (err) {
    console.log(err);
  }

  if (!event && req.user.role !== "superadmin") {
    return res
      .status(500)
      .json({ message: "Unauthorized user Unable To Update By this ID" });
  }
  return res.status(201).json({ event });
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  let event;
  try {
    event = await Event.findByIdAndRemove(id);
    req.body.user = req.user.id;
  } catch (err) {
    console.log(err);
  }
  if (!event && req.user.role !== "superadmin") {
    return res
      .status(500)
      .json({ message: "Unauthorized user Unable To Delete By this ID" });
  }
  return res.status(201).json({ message: "Event Successfully Deleted" });
};

exports.addEvent = addEvent;
exports.getAllEvents = getAllEvents;
exports.getById = getById;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.getEventsByDate = getEventsByDate;
