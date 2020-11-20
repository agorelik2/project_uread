const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    validate: [
      function (input) {
        return input.length >= 1;
      },
      "Title should be longer.",
    ],
  },
  author: {
    type: String,
    required: true,
  },

  description: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
