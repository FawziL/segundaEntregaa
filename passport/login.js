let LocalStrategy   = require('passport-local').Strategy;
let User = require('../models/user');
let bCrypt = require('bcrypt');

//Estrategia de Login/acceso
module.exports= function (passport){

	passport.use('login', new LocalStrategy({
        passReqToCallback : true //nos permite acceder al objeto request
        },
        async (req, username, password, done) => {
        try { 
            const user = await User.findOne({ 'username' :  username });
            console.log("se ha encontrado al usuario")

            if (!user || !isValidPassword(user, password)) {
                return done("Invalid credentials", false);
            }
            return done(null, user);
            
        } catch (err) {
                done(err);
        }
        
        })
    );

   //Desencriptar Password (cifrado)
    function isValidPassword (user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}