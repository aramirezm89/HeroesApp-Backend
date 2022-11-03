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



module.exports = {
  getHeroes,
  getHeroeById,
};
