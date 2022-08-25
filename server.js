const express = require('express')
const app = express()
const {Server: IOServer} = require('socket.io')
//const puerto = 8080
const passport = require("passport")
const initPassport = require( './passport/init.js')
const rutas = require( "./routes/index.js")(passport);
const path = require('path')
const fs = require('fs')
const mongoose = require( "mongoose")
require("dotenv").config()
const port = require('./minimist')

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

 
////////////////////////////////////////////
const serverExpress = app.listen(port, (error)=>{
    if(error){
        console.log(`Hubo un error: ${error}`)
    }else{
        console.log(`Servidor escuchando: ${port}`)
      }
})
////////////////////////////////////////////

//Inicializo PASSPORT
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);
app.use("/", rutas);

////////////////////////////////NUMEROSRAMDOM
function generateRandomNumber() {
    return Math.floor(Math.random() * (1000 - 1 + 1) + 1);
  }
  
  
app.get("/api/randoms",(req, res) => {
    const numeros = [];
    const cantidad = req.query.cant ? Number(req.query.cant) : 100;
    for(i=0; cantidad>i; i++){
      numeros.push(generateRandomNumber())
    }
    res.json(numeros)
  });
  
  
  

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


