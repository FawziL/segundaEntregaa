const LocalStrategy   = require('passport-local').Strategy;
const User =require( '../models/user.js');
const bCrypt  =require( 'bcrypt');

module.exports = function (passport){

	passport.use('register', new LocalStrategy({
            passReqToCallback : true 
        },
        async (req, email, password, done)=> {
            try {
                const existingUser = User.findOne({ 'email' :  email }, 
                    (err, user)=> {
                        if (err){
                            return done(err);
                        }
                        if (user) {
                            return done(null, false);
                        } else {
                            const newUser = {
                                email: req.body.username,
                                password: hashPassword(password),
                                
                            };
                            const createdUser = User.create(newUser);
                            return done(null, createdUser);
                        }
                }).clone()    
            } catch (err) {
                console.log(err);
                done(err);
            }
        
        })
            
     );
            
    // Encriptar Password (cifrado) usando bCrypt
    function hashPassword(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }  

}