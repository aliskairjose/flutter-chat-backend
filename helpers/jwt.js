const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h',
    }, (err, token) => {
      if (err) {
        // No se creo el token
        reject('Error al generar el token');
      } else {
        // Token creado
        resolve(token);
      }
    });
  });

}

module.exports = { generateJWT }