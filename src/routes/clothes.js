'use strict'
//THIS BRINGS IN EXPRESS
const express = require('express')
//THIS BRINGS IN THE DATA-COLLECTION-CLASS
const GenericCollection = require('../models/data-collection-class')
//PULLS IN THE CLOTHES MODEL
const clothesModel = require('../models/clothes')
//PULLS IN THE CLOTHES ROUTER
const clothesRouter = express.Router()
//SETS CLOTHES VARIABLE 
const clothes =  new GenericCollection(clothesModel)

//ALL THE ROUTES
//ROUTE FOR GETTING ALL THE ITEMS
clothesRouter.get('/food',getAll)
//ROUTE FOR GETTING ONE ITEM
clothesRouter.get('/food/:id',getOne)
//ROUTE FOR CREATING AN ITEM
clothesRouter.post('/food',createItem)
//ROUTE FOR UPDATING AN ITEM
clothesRouter.put('/food/:id',updateItem)
//ROUTE TO DELETE AN ITEM
clothesRouter.delete('/food/:id',deleteItem)

//GETS ALL ITEMS IN "CLOTHES"
async function getAll(req,res){
    let items = await clothes.read()
    res.status(200).json(items)
}
//GETS A SPECIFIC ID FROM "CLOTHES"
async function getOne(req,res){
    let id = req.params.id// ID VARIABLE CREATED AND IS SET TO A REQUEST THAT TAKES IN THE PARAM OF ID
    let item = await clothes.read(id)//ITEM VARIABLE CREATED AND SET TO WAIT FOR THE PROMISE TO BE SETTLED AND THEN GRABS THE "ID"
    res.status(200).json(item)//SENDS A STATUS OF "SUCCESS OR OK"
}
//CREATES A NEW ITEM ON "CLOTHES"
async function createItem(req,res){
    let data = req.body//DATA VARIABLE CREATED AND SET TO: A REQUEST THAT GRABS THE OBJECT
    let createItem = await clothes.create(data)// CREATEITEM IS SET TO WAIT FOR THE PROMISE AND THEN CREATE CLOTHES IN THE OBJECT BY USING REQ.BODY
    res.status(201).json(createItem)//SENDS A STATUS CODE OF 201 WHICH MEANS "CREATED"
}
//UPDATES AN ITEM INSIDE "CLOTHES"
async function updateItem(req,res){
    let id = req.params.id// VARIABLE ID IS CREATED AND SET TO: A REQUEST WITH THE PARAMS OF ID
    let data =req.body//VARIABLE DATA IS CREATED AND SET TO: A REQUEST OF THE BODY OF THE OBJECT
    let updateItem = await clothes.update(id,data)//VARIABLE UPDATEITEM IS CREATED AND WAITS FOR THE PROMISE THEN UPDATES CLOTHES BY FINDING IT AT THE ID AND INSERING THE DATA
    res.status(200).json(updateItem)//SENDS A STATUS CODE OF IZZ ALL GUD(200)
}
//DELETES AN ITEM IN "CLOTHES"
async function deleteItem(req,res){
    let id = req.params.id//ID VARIABLE CREATED AND SET TO: A REQUEST WITH THE PARAMS OF ID
    await clothes.delete(id)// WAITS FOR THE PROMISE AND DELETES A CLOTHES ITEM WITH THE ID
    res.status(200).json({msg:'deleted!'})//SENDS A STATUS CODE OF 200 AND A MESSAGE THAT SAYS DELETED
}
//EXPORTS THE THING WE JUST CREATED ON LINE 9
module.exports = clothesRouter