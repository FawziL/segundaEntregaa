const express = require('express')
const app = express()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const passport = require("passport")
const initPassport = require( './passport/init.js')
const rutas = require( "./routes/index.js")(passport);
const path = require('path')
const fs = require('fs')
const mongoose = require( "mongoose")
require("dotenv").config()
const os = require("os");
const cluster = require("cluster");
const cpus = os.cpus();
const { fork } = require("child_process");
const config = require('./config.js');
const mongo = config.mongodb
const port = config.port
const modo = config.modo
console.log(modo)
const isCluster = modo == "cluster";

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

//Inicializo PASSPORT
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

////////////////////////////////////////////
if (isCluster && cluster.isPrimary) {
    cpus.map(() => {
      cluster.fork()
   });
  
   cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork();
  
   });
  }  else{
    app.get('/api/randoms/datos'),(req, res)=>{
        res.send(`Server2-4 - PORT: ${port}`)
    }
    const connectedServer = httpServer.listen(port, () => {
      console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port} - PID ${process.pid}`)
  })
  connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
  }

////////////////////////////////////////////






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

