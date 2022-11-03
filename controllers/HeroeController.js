const Heroe = require("../models/heroes");

const getHeroes = async (req, res) => {
  try {
  const [heroes,totalHeroes] = await Promise.all([
        await Heroe.find().sort({superhero:1}),
        Heroe.count()
    ]);

    if(heroes){
      res.json({
            ok:true,
            heroes,
            totalHeroes
        })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        message:'Error del servidor'
    })
  }
};


module.exports = {
    getHeroes
}