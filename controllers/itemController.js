const db = require("../models");
const passport = require("../passport");

//Controllers for trip items, references the models and is referenced by the routes

module.exports = {
  findAll: function (req, res) {
    db.Item.find(req.query)
      .then((dbItemModel) => res.json(dbItemModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Item.findById(req.params.id)
      .then((dbItemModel) => res.json(dbItemModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Item.create(req.body)
      .then((dbItemModel) => res.json(dbItemModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Item.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbItemModel) => res.json(dbItemModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Item.findById({ _id: req.params.id })
      .then((dbItemModel) => dbItemModel.remove())
      .then((dbItemModel) => res.json(dbItemModel))
      .catch((err) => res.status(422).json(err));
  },
  findByUserId: function (req, res) {
    db.Item.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .then((TripModel) => res.json(TripModel))
      .catch((err) => res.status(422).json(err));
  },
};
