
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: 'Falta token'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Token inválido'
    })
  }
}

module.exports = { validateJWT }