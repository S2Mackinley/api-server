'use strict'
//PULLS IN EXPRESS
const express = require('express')
//GRABS THE DATA-COLLECTION-CLASS FROM MODELS FOLDER
const GenericCollection = require('../models/data-collection-class')
//PULLS IN AND REQUIRES THE FOOD FILE IN MODELS
const foodModel = require('../models/food')
//CREATES THE VARIABLE FOODROUTES AND SETS IT TO: EXPRESS.ROUTER()
const foodRouter = express.Router()
//CREATES THE VARIAVBLE FOOD AND SETS ITS TO: NEW GENERICCOFG........
const food =  new GenericCollection(foodModel)

//ALL THE ROUTES
//ROUTE FOR GETTING ALL THE ITEMS
foodRouter.get('/food',getAll)
//ROUTE FOR GETTING ONE ITEM
foodRouter.get('/food/:id',getOne)
//ROUTE FOR CREATING AN ITEM
foodRouter.post('/food',createItem)
//ROUTE FOR UPDATING AN ITEM
foodRouter.put('/food/:id',updateItem)
//ROUTE TO DELETE AN ITEM
foodRouter.delete('/food/:id',deleteItem)

//GETS ALL ITEMS IN "FOOD"
async function getAll(req,res){
    let items = await food.read()
    res.status(200).json(items)
}
//GETS A SPECIFIC ID FROM "FOOD"
async function getOne(req,res){
    let id = req.params.id// ID VARIABLE CREATED AND IS SET TO A REQUEST THAT TAKES IN THE PARAM OF ID
    let item = await food.read(id)//ITEM VARIABLE CREATED AND SET TO: WAIT FOR THE PROMISE TO BE SETTLED AND THEN GRABS THE OBJECT AT THE GIVEN ID
    res.status(200).json(item)//SENDS A STATUS OF "SUCCESS OR OK"
}
//CREATES A NEW ITEM ON "FOOD"
async function createItem(req,res){
    let data = req.body//DATA VARIABLE CREATED AND SET TO: A REQUEST THAT GRABS THE OBJECT
    let createItem = await food.create(data)// CREATEITEM IS SET TO WAIT FOR THE PROMISE AND THEN CREATE FOOD IN THE OBJECT BY USING REQ.BODY
    res.status(201).json(createItem)//SENDS A STATUS CODE OF 201 WHICH MEANS "CREATED"
}
//UPDATES AN ITEM INSIDE "FOOD"
async function updateItem(req,res){
    let id = req.params.id// VARIABLE ID IS CREATED AND SET TO: A REQUEST WITH THE PARAMS OF ID
    let data =req.body//VARIABLE DATA IS CREATED AND SET TO: A REQUEST OF THE BODY OF THE OBJECT
    let updateItem = await food.update(id,data)//VARIABLE UPDATEITEM IS CREATED AND WAITS FOR THE PROMISE THEN UPDATES CLOTHES BY FINDING IT AT THE ID AND INSERING THE DATA
    res.status(200).json(updateItem)//SENDS A STATUS CODE OF IZZ ALL GUD(200)
}
//DELETES AN ITEM IN "FOOD"
async function deleteItem(req,res){
    let id = req.params.id//ID VARIABLE CREATED AND SET TO: A REQUEST WITH THE PARAMS OF ID
    await food.delete(id)// WAITS FOR THE PROMISE AND DELETES A CLOTHES ITEM WITH THE ID
    res.status(200).json({msg:'deleted!'})//SENDS A STATUS CODE OF 200 AND A MESSAGE THAT SAYS DELETED
}
//EXPORTS THE THING WE JUST CREATED ON LINE 9
module.exports = foodRouter