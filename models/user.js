//passport packages
const bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First Name is required.",
  },

  lastName: {
    type: String,
    trim: true,
    required: "Last Name is required.",
  },

  email: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } },
    },
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },

  password: {
    type: String,
    trim: true,
    required: "Password is required.",
    validate: [
      function (input) {
        return input.length >= 6;
      },
      "Password should be at least 6 characters long.",
    ],
  },

  userCreated: {
    type: Date,
    default: Date.now,
  },

  book: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});
// Schema methods to check and hash passwords
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};
// Define hooks for pre-saving
userSchema.pre("save", function (next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");

    this.password = this.hashPassword(this.password);
    next();
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
