const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt')


const cargarUsuarios = async (req,res) =>{

    const desde = Number(req.params.desde) || 0;
    try {

      const [usuarios,totalRegistros] =  await Promise.all([
            await Usuario.find({},"username email role").sort({username:1}).skip(desde).limit(5),
            Usuario.count()    
        ])
        
      if(usuarios){
        return res.json({
            ok:true,
            usuarios,
            totalRegistros
        })
      }
    } catch (error) {
        
    }
}

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

const actualizarUsuario = async (req,res) =>{
    
  const id = req.params.id;
    
    try {
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({
          ok: false,
          message: "Usuario no encontrado",
        });
      }

      //actualizacion de campos

      const { email, password,username,role } = req.body;

      if (usuario.email !== email) {
        const emailValidar = await Usuario.findOne({ email });

        if (emailValidar) {
          return res.status(400).json({
            ok: false,
            mesasge: "Ya existe un usuario con ese email",
          });
        }
      }



      //encriptar contraseña

      const salt = bcrypt.genSaltSync();

    

      let passEncrypt = bcrypt.hashSync(password, salt);

      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        id,
        { username, email,password: passEncrypt, role },
        {
          new: true,
        }
      );

      res.json({
        ok: true,
        message: "Usuario actualizado",
        usuario: usuarioActualizado,
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Error del servidor'
        })
    }
}

const eliminarUsuario = async (req,res) =>{
const id  = req.params.id

try {
    const usuario = Usuario.findById(id);

    if(!usuario){
        return res.status(404).json({
            ok:false,
            mesasge:'Usuario no encontrado'
        })
    }

    await Usuario.findByIdAndDelete(id);

    return res.json({
        ok:true,
        message:'Usuario eliminado'
    })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        ok:false,
        message:'Error del servidor'
    })
}

}
module.exports = {
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    cargarUsuarios
}