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
//const port = require('./minimist')
const os = require("os");
const cluster = require("cluster");
const cpus = os.cpus();
const isCluster = process.argv[3] == "cluster";
const port = Number(process.argv[2]) || 8080;
const { fork } = require("child_process");



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGO_URL);

const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")


app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://Fawzi:Fawzi123@cluster0.5qcwzcb.mongodb.net/?retryWrites=true&w=majority',
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
  } 
  app.get('/api/randoms/datos'),(req, res)=>{
    res.send(`Server2-4 - PORT: ${port}`)
  }
    const connectedServer = app.listen(port, () => {
      console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port} - PID ${process.pid}`)
  })
  connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
  
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
const io = new IOServer(connectedServer)
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


