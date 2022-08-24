const { Router } = require('express')
const productos = require('../api/productos')
const routes = Router()
//const contenedor = require('../api/productosDB')
//const MariaDB = require('../MariaDB')
const path = require('path')


//const MariaDBApi = new contenedor(MariaDB, 'productos')

//const {faker} = require("@faker-js/faker");


/*
/////////////////////
routes.get('/api/productos', async function (req, res) {
    res.json(await MariaDBApi.getAll())
  })

routes.get('/api/productos/:id', async function (req, res) {
    res.json(await MariaDBApi.getById(req.params.id))
  })

routes.post('/api/productos', async function(req, res) {
      res.json(await MariaDBApi.newProduct(req.body))
  })


routes.put('/api/productos/:id', async function (req, res) {
      res.json(await MariaDBApi.update(req.body, req.params.id))
  })


routes.delete('/api/productos/:id', async function (req, res) {
   res.json(await MariaDBApi.deleteById(req.params.id))
  })
//////////////




routes.get('/api/productos-test', (req,res)=>{
    
  const response = [];

  for (let i = 1; i <= 5; i++) {
    response.push({
      id: i,
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(),
    });
  }
  console.log(response)
  res.json(response);
})
*/
/////////////////////////////////////

module.exports = function(passport){

routes.get('/',(req,res)=>{
  if(req.isAuthenticated()){
    res.sendFile(path.join(__dirname, ".././public/home.html"))
    }else{
    res.sendFile(path.join(__dirname, ".././public/login.html")); 
    }    
})
    ////////          LOGIN         ////////
routes.get('/login',(req, res)=>{
  if(req.isAuthenticated()){

  res.redirect('/')
  }else{
  res.sendFile(path.join(__dirname, ".././public/login.html")); 
  }
      
})
  
routes.get('/data',(req, res)=>{
  res.json({email: req.user.email})
})
  
    //POST LOGIN
routes.post('/login',passport.authenticate('login',
  {failureRedirect: '/fail-login',failureMessage: true}),
  (req, res)=>{
      res.redirect('/')
    }
)
    //GET FAIL LOGIN
routes.get('/fail-login',(req, res)=>{
  res.sendFile(path.join(__dirname, ".././public/faillogin.html"));
})
  
    ///////           SIGNUP            ///////////////////
    //GET REGISTRATION
routes.get('/signup',(req, res)=>{
    res.sendFile(path.join(__dirname, ".././public/register.html")); 
})
    //POST REGISTRATION
routes.post('/signup',passport.authenticate('register',{ failureRedirect: '/fail-signup',failureMessage: true}),(req, res)=>{
      console.log('req- metodo post-register',req.body)   
      res.redirect('/login') 
})
    ///FAIL SIGNUP
routes.get('/fail-signup',(req, res)=>{
  res.sendFile(path.join(__dirname, ".././public/failsignup.html"));
})
    //LOGOUT
routes.get('/logout',  function(req, res, next) {
      let user= req.user.email
  req.logout(function(err) {  
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



