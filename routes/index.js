const { Router } = require('express')
const routes = Router()
const path = require('path')
const isAuth = require ('../middlewares/isAuth.js');

module.exports = function(passport){

routes.get('/', isAuth,(req,res)=>{
  res.sendFile(path.join(__dirname, ".././public/home.html"))
})
routes.get('/login',(req, res)=>{
  if(req.isAuthenticated()){
  res.redirect('/')
  }else{
  res.sendFile(path.join(__dirname, ".././public/login.html")); 
  }    
})
routes.get('/data', isAuth, (req, res)=>{
  res.json({email: req.user.email})
})
routes.post('/login',passport.authenticate('login',
  {failureRedirect: '/fail-login',failureMessage: true}),
  (req, res)=>{
      res.redirect('/')
  }
)
routes.get('/fail-login',(req, res)=>{
  res.sendFile(path.join(__dirname, ".././public/faillogin.html"));
})
routes.get('/signup',(req, res)=>{
    res.sendFile(path.join(__dirname, ".././public/register.html")); 
})
routes.post('/signup',passport.authenticate('register',{ failureRedirect: '/fail-signup',failureMessage: true}),(req, res)=>{
  res.sendFile(path.join(__dirname, ".././public/login.html"));  
})
routes.get('/fail-signup',(req, res)=>{
  res.sendFile(path.join(__dirname, ".././public/failsignup.html"));
})
routes.get('/logout', isAuth,   function(req, res, next) {
  let user= req.user.email
  req.logout(function(err){  
    if (err)  return next(err); 
  res.send(`<h1>Hasta luego ${user}</h1>
          <script type="text/javascript">
          setTimeout(function(){ location.href = '/login'},2000)
          </script>`
        )
  })
})
return routes;
}

