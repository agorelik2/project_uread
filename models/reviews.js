const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  reviewBody: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const Review = mongoose.model("Review", favoriteSchema);

module.exports = Review;
