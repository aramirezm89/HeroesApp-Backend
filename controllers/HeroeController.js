const Heroe = require("../models/heroes");

const getHeroes = async (req, res) => {
  try {
    const [heroes, totalHeroes] = await Promise.all([
      await Heroe.find().sort({ superhero: 1 }),
      Heroe.count(),
    ]);

    if (heroes) {
      res.json({
        ok: true,
        heroes,
        totalHeroes,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error del servidor",
    });
  }
};

const getHeroeById = async (req, res) => {
  
   const id = req.params.id;
  
  try {
  
    const heroeDB = await Heroe.findById(id);

    if (!heroeDB) {
      return res.status(400).json({
        ok: false,
        message: "Heroe no encontrado",
      });
    }

   return res.json({
      ok: true,
      heroeDB,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      message: "Error del servidor",
    });
  }
};

const crearHeroe = async (req,res) =>{

  const {superhero} = req.body

  try {
    //revisar si el superheroe ya existe
    let superheroe = await Heroe.findOne({superhero});

    if(superheroe){
      return res.status(400).json({
        ok:false,
        message:'Ya existe ese superheroe'
      })
    }

    superheroe = new Heroe(req.body);

    await  superheroe.save();

    return res.json({
      ok:true,
      message:'Heroe creado con exito',
      heroe : superheroe
    })
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok:false,
      message:'Error del servidor'
    })
  }
}

const actualizarHeroe = async (req,res) =>{

  const id = req.params.id
  try {
    
     const heroeDB = await Heroe.findById(id);

    if(!heroeDB){
      return res.status(404).json({
        ok:false,
        message:'Heroe no encontrado'
      })
    }

    const {superhero} = req.body

    if(heroeDB.superhero !== superhero){
      const validarHeroe = await Heroe.findOne({ superhero });

      if (validarHeroe) {
        return res.status(400).json({
          ok: false,
          message: "El nombre del superheroe ya existe",
        });
      }
    }


   const heroeActualizado = await Heroe.findByIdAndUpdate(id,req.body,{new:true});

   return res.json({
    ok:true,
    message:'Heroe actualizado',
   heroeActualizado
   })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error del servidor",
   
    });
  }
}

const eliminarHeroe = async (req,res) =>{
const id = req.params.id

try {
  const heroe = await Heroe.findById(id);

  if(!heroe){
    return res.status(404).json({
      ok:false,
      message:'Heroe no encontrado'
    })
  }

  await Heroe.findByIdAndDelete(id);

  return res.json({
    ok:true,
    message:'Heroe eliminado'
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
  getHeroes,
  getHeroeById,
  crearHeroe,
  actualizarHeroe,
  eliminarHeroe
};
