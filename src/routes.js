const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const uploadConfig = require("./config/upload");
const SessionController = require("./controllers/SessionController");
const FilmeController = require("./controllers/FilmeController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");

const routes = express.Router();
const upload = multer(uploadConfig);

function verifyJWT(req, res, next) {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ").pop()
    : null;
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, process.env.MYSECURITYTOKEN, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

//sessions //logar
routes.post("/auth/:email/:senha", SessionController.validarLogin);
routes.post("/sessions", SessionController.store);


//inserir filme ou serie
routes.post("/post", upload.single("thumbnail"), FilmeController.store);
routes.get("/post", FilmeController.index);

// dashboard
routes.get("/dashboard", DashboardController.show);
routes.post("/spots/:spot_id/bookings", BookingController.store);

module.exports = routes;
