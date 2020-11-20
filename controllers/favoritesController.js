const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Favorite.find(req.query)
      .sort({ date: -1 })
      .then((dbFavoriteModel) => res.json(dbFavoriteModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Favorite.findById(req.params.id)
      .then((dbFavoriteModel) => res.json(dbFavoriteModel))
      .catch((err) => res.status(422).json(err));
  },
  findByUserId: function (req, res) {
    //console.log(req);
    const userId = req.user._id;
    db.Favorite.find({ user: userId })
      .sort({ createdAt: -1 })
      .then((dbFavoriteModel) => res.json(dbFavoriteModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    //console.log(req.body)
    db.Favorite.create(req.body)
      .then((dbFavoriteModel) => res.json(dbFavoriteModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Favorite.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbFavoriteModel) => res.json(dbFavoriteModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    //console.log("remove this")
    db.Favorite.findById({ _id: req.params.id })
      .then((dbFavoriteModel) => dbFavoriteModel.remove())
      .then((dbFavoriteModel) => res.json(dbFavoriteModel))
      .catch((err) => res.status(422).json(err));
  },
};
