const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async (req,res) => {

    const {email,password} = req.body;

    //verificar email 

    const usuario = await Usuario.findOne({email});

    if(!usuario){
        return res.status(404).json({
            ok:false,
            message:'Credenciales no validas'
        })
    }

    //verifficar contraseña

    const validarPass = await bcrypt.compareSync(password,usuario.password);

    if(!validarPass){
        return res.status(404).json({
            ok:false,
            message:'Credenciales no validas'
        })
    }

    //generar token

    const token = await generarJWT(usuario.id,usuario.username,usuario.email);

    return res.json({
        ok:true,
        message:`Bienvenido ${usuario.username}`,
        usuario,
        token
    })
}

module.exports = {
    loginUsuario
}