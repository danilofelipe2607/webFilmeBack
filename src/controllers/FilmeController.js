const Filme = require("../models/Filme");
const User = require("../models/User");

module.exports = {
  //index get
  async index(req, res) {
    const { tech } = req.query;
    const filmes = await Filme.find({ techs: tech });
    return res.json(filmes);
  },

  //create post
  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;
    console.log(
      "req.file",
      req.file,
      "req.body;",
      req.body,
      "user",
      req.headers
    );
    console.log("user_iddsddsdsdsdss", user_id);
    const user = await User.findOne({ id: user_id });
    console.log("dsdfs", user);
    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }
    console.log("asw");
    const filme = await Filme.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs,
      // : techs.split(",").map(tech => tech.trim()),
      price
    });
    return res.json(spot);
  }
};
