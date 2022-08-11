const { Router } = require('express')
const productos = require('../api/productos')
const routes = Router()
const contenedor = require('../api/productosDB')
const MariaDB = require('../MariaDB')


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







module.exports = routes


