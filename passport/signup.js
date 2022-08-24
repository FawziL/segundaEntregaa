const LocalStrategy   = require('passport-local').Strategy;
const User =require( '../models/user.js');
const bCrypt  =require( 'bcrypt');

module.exports = function (passport){

	passport.use('register', new LocalStrategy({
            passReqToCallback : true 
        },
        async (req, email, password, done)=> {
            try {	
                const existingUser = await User.findOne({ 'email': email })
                    if (existingUser) return done(null, false, 'Ya existe el usuario')
                            const newUser = {
                                email: req.body.username,
                                password: hashPassword(password),
                 
                            };
                            const createdUser = await User.create(newUser);
                            return done(null, createdUser);
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

