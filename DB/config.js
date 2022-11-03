const mongoose = require('mongoose');


const dbConecction = async () =>{
    try {
        await mongoose.connect(process.env.DB_CONNECTIONSTRING);

        console.log('DB online')
    } catch (error) {
        console.log(error)

        throw new Error('Error en la conexion a la base de datos')
    }
}

module.exports = dbConecction;