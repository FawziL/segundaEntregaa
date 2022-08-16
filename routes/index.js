const { Router } = require('express')
const productos = require('../api/productos')
const routes = Router()
const contenedor = require('../api/productosDB')
const MariaDB = require('../MariaDB')
const path = require('path')


const MariaDBApi = new contenedor(MariaDB, 'productos')

const {faker} = require("@faker-js/faker");



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

////////////////////////////////////
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
routes.get("/" , auth,(req, res) => {
  console.log("Hola");
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
routes.get("/login",loginMiddleware, (req, res) =>{
  res.sendFile(path.join(__dirname, "../public/login.html"))
})
routes.get("/api/login", async (req, res) => {
  try {
    console.log(req.query.username);
    req.session.username = req.query.username;

    res.redirect("/");
  } catch (err) {
    res.json({ error: true, message: err });
  }
});

routes.get('/logout', (req, res) => {
  if (req.session.username) {
      req.session.destroy(err => {
          if (!err) {
              res.sendFile(path.join(__dirname, "../public/logout.html"))
          } else {
              res.redirect('/')
          }
      })
  } else {
      res.redirect('/')
  }
})





module.exports = routes


