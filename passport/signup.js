const LocalStrategy   = require('passport-local').Strategy;
const User =require( '../models/user.js');
const bCrypt  = require( 'bcrypt');
const nodemailer = require("nodemailer")

module.exports = function (passport){
    const nodemailer = require("nodemailer")
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
                    nombre: req.body.nombre,
                    dirección: req.body.dirección,
                    edad: req.body.edad,
                    telf: req.body.telf,
                    avatar : req.body.avatar,

                };

                const TEST_MAIL = "francesca.howell64@ethereal.email";

                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'francesca.howell64@ethereal.email',
                        pass: '1GKBq27swN2228NXE9'
                    }
                });
                
                const mailOptions = {
                  from: "Servidor Node",
                  to: TEST_MAIL,
                  subject: "Nuevo registro",
                  html: `<h1>Nuevo usuario:</h1>
                  <h2>Email: ${newUser.email}</h2>
                  <h2>Nombre: ${newUser.nombre}</h2>
                  <h2>Dirección: ${newUser.dirección}</h2>
                  <h2>Edad: ${newUser.edad}</h2>
                  <h2>Telf: ${newUser.telf}</h2>
                  <h2>Avatar: ${newUser.avatar}</h2>`,
                };
                
                async function enviarInfo() {
                  const info = await transporter.sendMail(mailOptions);
                  console.log(info);
                }
                try {
                  enviarInfo()
                } catch (error) {
                  console.log(error);
                }                

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

