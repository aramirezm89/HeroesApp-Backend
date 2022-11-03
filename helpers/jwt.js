const jwt = require("jsonwebtoken");

const generarJWT = (id, nombre, email) => {

  const payload = { id, nombre, email };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};


module.exports = {
    generarJWT
}