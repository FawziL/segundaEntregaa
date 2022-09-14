const logger = require('../logger.js');

const handleAll = (req, res, next) => {
    logger.info(`${req.method}: ${req.path} - `)
    next()
}
module.exports =  handleAll 
