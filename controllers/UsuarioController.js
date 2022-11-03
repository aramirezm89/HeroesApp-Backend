const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt')

const crearUsuario = async (req,res) =>{

    const {email,password,} = req.body;
 
    try {
        
        let usuario = await Usuario.findOne({email:email});

        console.log(usuario)
        if(usuario){
            return res.status(400).json({
                ok:false,
                message:'Ya existe una cuenta de usuario con este email.'
            })
        }

        usuario = new Usuario(req.body);

        //encriptar contraseña

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password,salt);

        //generar jwt

        const token = await generarJWT(usuario.id,usuario.username,usuario.email);


        //guardar usuario en DB

        await usuario.save();

        return res.json({
            ok:true,
            message:'Usuario creado con exito',
            token,
            usuario
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            message:'Error del servidor'
        })
    }
}

module.exports = {
    crearUsuario
}