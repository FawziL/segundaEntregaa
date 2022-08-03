const express = require('express')
const app = express()
const {Server: IOServer} = require('socket.io')
const puerto = 8080
const rutas = require('./routes/index')
const path = require('path')
const database = require('./SQLite3')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', rutas)


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
        await database.schema.dropTableIfExists('mensaje');
        console.log('Ha caido el mensaje')
        await database.schema.createTable('mensaje', table=>{
            table.increments('id').primary()
            table.string('email',50)
            table.string('tiempochat')
            table.string('message')
        });
        console.log('Se ha creado la tabla!')
        console.log(messages)
        await database.from('mensaje').insert(messages);
        console.log('Los mensajes han sido guardados en la tabla!')
        let rows = await database.from('mensaje').select("*");
        rows.forEach((article)=>{ console.log(`${article['id']} ${article['email']} ${article['tiempochat']}: ${article['message']}`) });
        
        
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


