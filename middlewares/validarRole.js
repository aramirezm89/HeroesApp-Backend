const Usuario = require('../models/usuario')

const validarAdminRole = async (req,res,next) =>{
 
  const uid = req.id; // id usuario logeado
  const id = req.params.id;

  try {
    const usuario = await Usuario.findById(uid);

    if(!usuario){
        return res.status(404).json({
            ok:false,
            message:'Usuario no existe'
        })
    }


    if(usuario.role === 'USER_ROLE' && uid !== id){
        return res.status(403).json({
            ok:false,
            message:'No tienes permiso para realizar la acción'
        })
    }

    next();
  } catch (error) {

    console.log(error);

    res.status(500).json({
        ok:false,
        message:'Error del servidor'
    })
  }
}

module.exports ={
    validarAdminRole
}