const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            message:'No estas autorizado para realizar la acción'
        })
    }

    try {

        const { id, nombre, email } = jwt.verify(
          token,
          process.env.SECRET_JWT_SEED
        );

        req.id = id;
        req.nombre = nombre;
        req.email = email;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            message:'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}