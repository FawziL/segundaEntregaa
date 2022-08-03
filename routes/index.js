const { Router } = require('express')
const productos = require('../api/productos')
const routes = Router()
const contenedor = require('../api/productosDB')
const MariaDB = require('../MariaDB')

const productApi = new productos()
const MariaDBApi = new contenedor(MariaDB, 'productos')


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
module.exports = routes