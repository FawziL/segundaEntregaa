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

//const { fork } = require("child_process");
const isAuth = require ('../middlewares/isAuth.js');
const util = require("util");
const compression = require ("compression");
const logger = require ("../logger.js");

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
/*routes.get("/api/randoms",(req, res) => { 
  const forked = fork("child.js");
  forked.send(req.query.cant ? Number(req.query.cant) : 100000000)
  forked.on('message', (msg) => {
  res.json(msg);
  });
});*/

routes.get('/info',compression(), (req,res)=>{util
  res.json(
  `Titulo del proceso: ${process.title}
  Sistema operativo: ${process.platform}
  Version de Node: ${process.version}
  Memoria total reservada: ${util.inspect(process.memoryUsage(), {
    showHidden: false,
    depth: null,
    colors: true})}
  Path de ejecución: ${util.inspect(process.execPath)}
  Process id: ${process.pid}    
  Carpeta del proyecto: ${process.cwd()}
  Procesadores presentes: ${process.pid}`
)});
routes.get("*", (req, res) => {
  const { url, method } = req;
  logger.warn(`Ruta ${method} ${url} no implementada`);
  res.send(`Ruta ${method} ${url} no está implementada`);
});


return routes;
}

