const db = require("../models");
const passport = require("../passport");

//Controllers for Books, references the models and is referenced by the routes
module.exports = {
  //Find All Books
  findAll: function (req, res) {
    db.Book.find(req.query)
      .sort({ date: -1 })
      .then((dbBookModel) => res.json(dbBookModel))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Book.findById(req.params.id)
      .then((dbBookModel) => res.json(dbBookModel))
      .catch((err) => res.status(422).json(err));
  },

  create: function (req, res) {
    db.Book.create(req.body)
      .then((dbBookModel) => res.json(dbBookModel))
      .catch((err) => res.status(422).json(err));
  },

  // create: function (req, res) {
  //   console.log("++++++++++++++++++++++++");
  //   console.log(req.body);
  //   console.log("++++++++++++++++++++++++");
  //   //console.log(req);

  //   //updated create route to save userId for the user who created the book ALG
  //   db.Book.create(req.body)
  //     .then((dbBookModel) => {
  //       //  console.log(dbBookModel);
  //       const bookId = dbBookModel._id;
  //       const userId = req.user._id;
  //       db.User.findOneAndUpdate({ _id: userId }, { $push: { book: bookId } })
  //         .then((dbUserModel) => {
  //           res.json(dbUserModel);
  //         })
  //         .catch((err) => res.status(422).json(err));
  //     })
  //     .catch((err) => res.status(422).json(err));
  // },

  update: function (req, res) {
    console.log(
      "Inside book controller, update function,checking id: ",
      req.params.id
    );
    db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbBookModel) => res.json(dbBookModel))
      .catch((err) => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.Book.findById({ _id: req.params.id })
      .then((dbBookModel) => dbBookModel.remove())
      .then((dbBookModel) => res.json(dbBookModel))
      .catch((err) => res.status(422).json(err));
  },

  findByUserId: function (req, res) {
    //console.log(req);
    const userId = req.user._id;
    //db.Book.find({ user: req.params.id })
    db.Book.find({ user: userId })
      .sort({ createdAt: -1 })
      .then((dbBookModel) => res.json(dbBookModel))
      .catch((err) => res.status(422).json(err));
  },

  //ALG Get Books by User ID
  getUserBooks: function (req, res) {
    // console.log("User Id:");
    // console.log("////////////////");
    // console.log(req.user._id);
    // console.log(req.session.passport.user);

    db.User.find({
      // _id: req.session.passport.user,
      _id: req.user._id,
    })
      .populate("books")

      // .sort({ createdAt: -1 })
      .exec(function (err, users) {
        if (err) {
          console.log(err);
        } else {
          console.log("################");
          console.log("Populated User: " + users);
          res.send(users);
        }

        //   //res.send(dbBookModel);
        //   res.json(dbBookModel);
        // })
        // .catch(function (err) {
        //   return err;
        // });
      });
  },

  //.then((dbBookModel) => res.json(dbBookModel))
  //ALG Populate
  // getUserBooks: function (req, res) {
  //   console.log("User Id:");
  //   console.log("////////////////");
  //   console.log(req.user._id);
  //   console.log(req.session.passport.user);
  //   db.User.find({
  //     // _id: req.session.passport.user,
  //     _id: req.user._id,
  //   })
  //     .populate("books")
};
