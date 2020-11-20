const { User } = require("../models");
const db = require("../models");
const passport = require("../passport");

//Controllers for users
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .then((dbUserModel) => res.json(dbUserModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    //const id = req.params.id !== "undefined" ? req.params.id : req.user._id;
    // console.log("user id");
    // console.log(typeof id);
    // console.log("Inside userController findById");
    // console.log(req.params.id);
    // console.log("+++++++++++++++++++");
    // console.log(req.user._id);
    db.User.findById(req.params.id)
      // .populate("book") //AG updated user controller
      .then((dbUserModel) => {
        // console.log("dbUserModel");
        // console.log(dbUserModel);

        res.json(dbUserModel);
      })
      .catch((err) => {
        // console.log("errrr");
        // console.log(err);
        res.status(422).json(err);
      });
  },
  create: function (req, res) {
    const email = req.body.email;
    console.log("In USER CONTROLLER", email);
    db.User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log("User.js post error: ", err);
        res
          .status(201)
          .send({ error: `Sorry, email validaion failed: ${email}` });
      } else if (user) {
        res
          .status(201)
          .send({ error: `Sorry, already a user with the email: ${email}` });
        // res.json({
        //   error: `Sorry, already a user with the email: ${email}`,
        // });
      } else {
        // console.log("REQ.BODY");
        // console.log(req.body);
        // console.log("=============================");
        // const hashedPassword = generateHash(req.body.password);
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        //console.log(req.user._id);
        console.log("==============================");
        db.User.create(newUser)
          .then((dbUserModel) => {
            console.log("log  in");
            req.login(dbUserModel, function (err) {
              res.json(dbUserModel);
            });
          })
          // .catch((err) => res.status(422).json(err));
          .catch((err) => res.send(err));
      }
    });
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbUserModel) => res.json(dbUserModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbUserModel) => dbUserModel.remove())
      .then((dbUserModel) => res.json(dbUserModel))
      .catch((err) => res.status(422).json(err));
  },
};
