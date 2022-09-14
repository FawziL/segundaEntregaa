const express = require('express')
const app = express()
const {Server: IOServer} = require('socket.io')
const passport = require("passport")
const initPassport = require( './passport/init.js')
const rutas = require( "./routes/index.js")(passport);
const path = require('path')
const fs = require('fs')
const mongoose = require( "mongoose")
require("dotenv").config()
const config = require('./config/config')
const mongo = config.mongodb
const port = config.port
//const logger = require ("./logger.js");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(mongo);

const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")


app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: mongo,
        }),
        secret: "coderhouse",
        resave: false,
        saveUninitialized: false,
        rolling: false,
        cookie:{
            maxAge: 500000,
        }
    })
)


app.use(express.static(`${__dirname}/public`));

 
////////////////////////////////////////////
const serverExpress = app.listen(port, (error)=>{
    if(error){
        console.log(`Hubo un error: ${error}`)
    }else{
        //logger.info(`Servidor http escuchando en el puerto ${serverExpress.address().port} - PID ${process.pid}`)
        console.log(`Servidor escuchando: ${port}`)
      }
})
////////////////////////////////////////////

//Inicializo PASSPORT
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);
app.use("/", rutas);


////////////////////////////////////////////
const products = []
const messages = []

////GUARDAR CHAT EN EL ARCHIVO////////
async function escribir(){
    try{
        await fs.promises.writeFile(path.join(__dirname,'/chat'), JSON.stringify(messages))
        console.log('El chat ha sido guardado')
    }catch(err){
        console.log('no se pudo guardar el chat', err)
        
    }

}
//// SOCKET IO  ////////
const io = new IOServer(serverExpress)
io.on('connection', socket =>{
    console.log(`Se conectó un usuario ${socket.id}`) 
    io.emit('client:price:thumbnail', products)
    socket.on('client:price:thumbnail', objectInfo => {
        products.push(objectInfo)
        io.emit('client:price:thumbnail', products)
    })

    io.emit('server:message', messages)
    
    socket.on('client:message', messageInfo => {
        messages.push(messageInfo)
        escribir()
        io.emit('server:message', messages)
    })
})


