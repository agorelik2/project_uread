const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Review.find(req.query)
      .sort({ date: -1 })
      .then((dbReviewModel) => res.json(dbReviewModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Review.findById(req.params.id)
      .then((dbReviewModel) => res.json(dbReviewModel))
      .catch((err) => res.status(422).json(err));
  },
  findByBookId: function (req, res) {
    //console.log(req);
    const bookId = req.params.id;
    db.Review.find({ bookId: bookId })
      .sort({ createdAt: -1 })
      .then((dbReviewModel) => res.json(dbReviewModel))
      .catch((err) => res.status(422).json(err));
  },

  findByUserId: function (req, res) {
    //console.log(req);
    const userId = req.user._id;
    db.Review.find({ user: userId })
      .sort({ createdAt: -1 })
      .then((dbReviewModel) => res.json(dbReviewModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    // console.log(req.body);
    console.log("review route *****");
    db.Review.create(req.body)
      .then((dbReviewModel) => res.json(dbReviewModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Review.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbReviewModel) => res.json(dbReviewModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    //console.log("remove this")
    db.Review.findById({ _id: req.params.id })
      .then((dbReviewModel) => dbReviewModel.remove())
      .then((dbReviewModel) => res.json(dbReviewModel))
      .catch((err) => res.status(422).json(err));
  },
};
