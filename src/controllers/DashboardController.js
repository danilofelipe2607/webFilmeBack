const Filme = require("../models/Filme");
module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;
    console.log(user_id);
    const filme = await Filme.find({ user: user_id });
    return res.json(filme);
  }
};
