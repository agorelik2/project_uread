const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  googleId: { type: String, required: true, unique: false },
  image: { type: String, required: true },
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  description: { type: String, required: true },
  link: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
