const express = require('express')
const cors = require('cors');
const history = require('connect-history-api-fallback');
const { dbConection } = require('../database/config');
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            tareas: '/api/tareas',
            test: '/api/test'
        } ;

        // ConectarDB
        this.conectarDB();

        // Middelwares
        this.middelwares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middelwares() {

       
        // Cors
        this.app.use( cors() )

        //Lectura y parseo del body
        this.app.use( express.json() )

        // Directorio Publico
        this.app.use(express.static('public'))

    }

    async conectarDB(){
        await dbConection()
    }

    routes() {

        this.app.use(this.usuariosPath.usuarios, require('../routes/usuarios.router'))
        this.app.use(this.usuariosPath.auth, require('../routes/login.router'))
        this.app.use(this.usuariosPath.tareas, require('../routes/tareas.router'))
        this.app.use(this.usuariosPath.test, require('../routes/test.router'))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("Server on port: ", this.port);
        })
    }

}


module.exports = Server;