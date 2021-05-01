'use strict'

module.exports = (req,res,next) =>{
    console.log('REQUESTED: ',req.method,req.path)
    next()
}