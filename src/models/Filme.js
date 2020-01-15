const mongoose = require("mongoose");

const FilmeSchema = new mongoose.Schema(
  {
    thumbnail: String,
    nome: String,
    type: String,
    descripition: String,
    date: Date,
	dateLancamento: Date,
    letter: String,
    url: String,
    observation: String,
    search: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },

  {
    toJSON: {
      virtuals: true
    }
  }
);
FilmeSchema.virtual("thumbnail_url").get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
});
module.exports = mongoose.model("Filme", FilmeSchema);
