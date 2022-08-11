const express = require('express')
const app = express()
const {Server: IOServer} = require('socket.io')
const puerto = 8080
const rutas = require('./routes/index')
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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

function auth(req, res, next){
    if(req.session.username){
        next();
    }else{
        res.redirect("/login");
    }
}
function loginMiddleware(req, res, next) {
    if (req.session.username) {
      res.redirect("/");
    } else {
      next();
    }
  }
app.get("/" , auth,(req, res) => {
    console.log("Hola");
    res.sendFile(path.join(__dirname, "/public/home.html"));
  });
app.get("/login",loginMiddleware, (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/login.html"))
})
app.get("/api/login", async (req, res) => {
    try {
      console.log(req.query.username);
      req.session.username = req.query.username;
  
      res.redirect("/");
    } catch (err) {
      res.json({ error: true, message: err });
    }
  });


  app.get('/logout', (req, res) => {
    if (req.session.username) {
        req.session.destroy(err => {
            if (!err) {
                res.sendFile(path.join(__dirname, "./public/logout.html"))
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})
////////////////////////////////////////////
const serverExpress = app.listen(puerto, (error)=>{
    if(error){
        console.log(`Hubo un error: ${error}`)
    }else{
        console.log(`Servidor escuchando: 8080`)
      }
})

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


