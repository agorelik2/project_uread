//require auth to be tied to the post
const passport = require("../../passport");

//backend routes
const router = require("express").Router();
const userController = require("../../controllers/userController");

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

//Matches with "/api/logout"
router.get("/logout", (req, res) => {
  console.log("REQ USER");
  console.log(req.user);
  if (req.user) {
    req.logout();
    //req.session.destroy();
    // res.send({ msg: "logging out" });
    console.log("LOGGED OUT");
    res.send(true);
    //res.redirect("/");
  } else {
    console.log("NO USER to LOG OUT");
    res.send({ msg: "no user to log out" });
    //res.redirect("/");
  }
});
router.post(
  "/login",
  //   function (req, res, next) {
  //     console.log(req.body);
  //     console.log("%%%%%%%%%%%%%");
  //     next();
  //   },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      id: req.user._id,
    };
    // req.login();
    res.send(userInfo);
  }
);

//Matches with "user/signup"
//router.route("/signup").post(userController.create);
router.post(
  "/signup",

  userController.create,
  (req, res) => {
    console.log("user created", req.user);
    var userInfo = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      id: req.user._id,
    };

    req.login();
    res.send(userInfo);
  }
);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
