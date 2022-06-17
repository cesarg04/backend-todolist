const mongosse = require('mongoose');

const dbConection = async() => {

    try {
        
        await mongosse.connect( process.env.MONGODB_CONECTION, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        } );

        console.log("Base de datos Online");

    } catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos')

    }


}   


module.exports = { 
    dbConection
}