const { Router } = require('express')
const productoMySqlDao = require('../api/productosDB.js')
const logger = require('../logger.js')
const routesApi = Router()

routesApi.get('/productos', async function (req, res, next) {
    try {
        const productos = productoMySqlDao.getAll()
        res.json({ data: productos })
    } catch (err) {
        //Si ocurre un error lo paso al proximo manejador
        next(err)
    }
})

//Utilizo un middleware para menajr cualquier error que ocurra
routesApi.use(( err,req, res, next,) => {
    logger.error(err)
    res.status(500).json({ error: "Ha ocurrido un error" })
})

module.exports = routesApi
