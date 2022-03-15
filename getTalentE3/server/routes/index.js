const { usuario} = require("../controllers");
const { validCreateUpUsuario } = require("../validators/usuario");

const { Router } = require("express");

const router = Router();

router
  .route("/usuario")
  .get(usuario.getUsuario)
  .post(validCreateUpUsuario, usuario.addUsuario);

router
  .route("/usuario/:id")
  .get(usuario.getUsuarioById)
  .put(usuario.updateUsuario)
  .delete(usuario.deleteUsuario);

module.exports = { router };
