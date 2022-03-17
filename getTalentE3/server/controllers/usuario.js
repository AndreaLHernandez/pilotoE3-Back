const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { usuarioNotFound, usuarioDeleted } = require("../helpers/constants.js");
const bcrypt = require("bcryptjs");
//const usuario = require("../../database/models/usuario");

// EP to get all clients
const getUsuarios = async (req, res) => {
  try {
    const getAllUsuarios = await models.usuario.findAll({
      where: {
        statusDelete: false,
      },
    });

    return res.status(200).send(getAllUsuarios);
  } catch (error) {
    httpError(res, error);
  }
};

// EP to get client by id
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const getUsuario = await models.usuario.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!getUsuario) return res.status(404).send(response(usuarioNotFound));

    return res.status(200).send(getUsuario);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to add client
const addUsuario = async (req, res) => {

  try {
    const { body } = req;
    const encPass = bcrypt.hashSync(body.password)
    let rol;
    if(body.solicitante==true){
      rol= await models.rol.create({
        solicitante: true,
      })

    }else if(body.empleador==true){
      rol= await models.rol.create({
        empleador: true,
      })
    }else if(body.admin==true){
      rol= await models.rol.create({
        admin: true,
      })
    }  
    const usuario = await models.usuario.create({
      email: body.email,
      password: encPass,
      rol_id: rol.id
   //falta agregar si es empresa, solicitante o admin
    });

    return res.status(200).send(usuario);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to update client
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const usuario = await models.usuario.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!usuario) return res.status(404).send(response(usuarioNotFound));

    usuario.update({
      email: body.email,
      password: body.password,
    });

    return res.status(200).send(usuario);
  } catch (error) {
    httpError(res, error);

  }
};

//EP to "delete" client in this case is soft delete, change the value statusDelete true
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await models.usuario.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!usuario) return res.status(404).send(response(usuarioNotFound));

    usuario.update({
      statusDelete: true,
    });

    return res.status(200).send(response(usuarioDeleted));
  } catch (error) {
    httpError(res, error);
  }
};

//Para el login 

const login = async (req, res) => {
  try {
    const { body} = req;

    const usuario = await models.usuario.findOne({
      where: {
        email: body.email,
        status: true,
      },
       //attributes: ["id", "name", "email", "password", "rol"],
    });

    if (!usuario) {
      return res.status(401).send("Email does not exist");
    }

    const match = await bcrypt.compareSync(body.password, usuario.password);
    console.log(match);

    if (match === false) {
      return res.status(401).send("Password does not match");
    }

    const payload = {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      //role: usuario.role,
    };

    return res.status(200).send({
      msg: "User logged successfully",
      data: payload,
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
module.exports = {
  getUsuarios,
  getUsuarioById,
  addUsuario,
  updateUsuario,
  deleteUsuario,
  login,
};
