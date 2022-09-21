const mongoose = require( "mongoose")

module.exports = mongoose.model('User', {
    email: String,
    password:String, 
    nombre: String,
    dirección: String,
    edad: Number,
    telf: Number,
    avatar : String,
})
