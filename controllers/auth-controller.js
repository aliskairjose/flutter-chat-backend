const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const user = require('../models/user');

const createUser = async (req, res = response) => {

  const { email, password } = req.data;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: 'Correo existente'
      })
    }
    const user = new User(req.data);

    // Encriptacion de password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await generateJWT(user.id);
    res.json({
      ok: true,
      msg: 'Usuario creado',
      data: user,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el admin'
    });
  }
}

// Login
const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userDb = await User.findOne({ email });

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: 'Credenciales no válidas'
      })
    }

    // Validar password
    const passwordValidate = bcrypt.compareSync(password, userDb.password);

    if (!passwordValidate) {
      return res.status(404).json({
        ok: false,
        msg: 'Credenciales no válidas'
      })
    }

    // Generar el JWT
    const token = await generateJWT(userDb.id);

    return res.json({
      ok: true,
      msg: 'Bienvenido',
      data: userDb,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}

const renewToken = async (req, res=response) => {
  const uid = req.uid
  const user = await User.findById(uid);
  const token = await generateJWT(uid);

  res.json({
    ok: true,
    msg: 'Token renovado',
    data: user,
    token
  })
}

module.exports = { createUser, login, renewToken }