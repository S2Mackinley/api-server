'use strict';
//PULLS IN EXPRESS
const express = require('express');
//GRABS THE DATA-COLLECTION-CLASS FROM MODELS FOLDER
const GenericCollection = require('../models/data-collection-class');
//PULLS IN AND REQUIRES THE FOOD FILE IN MODELS
const productModel = require('../models/product');
//CREATES THE VARIABLE productRouter AND SETS IT TO: EXPRESS.ROUTER()
const productRouter = express.Router();
//CREATES THE VARIABLE FOOD AND SETS ITS TO: NEW GENERICCOFG........
const product = new GenericCollection(productModel);

//ALL THE ROUTES
//ROUTE FOR GETTING ALL THE ITEMS
productRouter.get('/product', getAll);
//ROUTE FOR GETTING ONE ITEM
productRouter.get('/product/:id', getOne);
//ROUTE FOR CREATING AN ITEM
productRouter.post('/product', createItem);
//ROUTE FOR UPDATING AN ITEM
productRouter.put('/product/:id', updateItem);
//ROUTE TO DELETE AN ITEM
productRouter.delete('/product/:id', deleteItem);

//GETS ALL ITEMS IN "FOOD"
async function getAll(req, res) {
	let items = await product.read();
	res.status(200).json(items);
}
//GETS A SPECIFIC ID FROM "FOOD"
async function getOne(req, res) {
	let id = req.params.id; // ID VARIABLE CREATED AND IS SET TO A REQUEST THAT TAKES IN THE PARAM OF ID
	let item = await product.read(id); //ITEM VARIABLE CREATED AND SET TO: WAIT FOR THE PROMISE TO BE SETTLED AND THEN GRABS THE OBJECT AT THE GIVEN ID
	res.status(200).json(item); //SENDS A STATUS OF "SUCCESS OR OK"
}
//CREATES A NEW ITEM ON "FOOD"
async function createItem(req, res) {
	let data = req.body; //DATA VARIABLE CREATED AND SET TO: A REQUEST THAT GRABS THE OBJECT
	let createItem = await product.create(data); // CREATEITEM IS SET TO WAIT FOR THE PROMISE AND THEN CREATE FOOD IN THE OBJECT BY USING REQ.BODY
	res.status(201).json(createItem); //SENDS A STATUS CODE OF 201 WHICH MEANS "CREATED"
}
//UPDATES AN ITEM INSIDE "FOOD"
async function updateItem(req, res) {
	let id = req.params.id; // VARIABLE ID IS CREATED AND SET TO: A REQUEST WITH THE PARAMS OF ID
	let data = req.body; //VARIABLE DATA IS CREATED AND SET TO: A REQUEST OF THE BODY OF THE OBJECT
	let updateItem = await product.update(id, data); //VARIABLE UPDATEITEM IS CREATED AND WAITS FOR THE PROMISE THEN UPDATES CLOTHES BY FINDING IT AT THE ID AND INSERING THE DATA
	res.status(200).json(updateItem); //SENDS A STATUS CODE OF IZZ ALL GUD(200)
}
//DELETES AN ITEM IN "FOOD"
async function deleteItem(req, res) {
	let id = req.params.id; //ID VARIABLE CREATED AND SET TO: A REQUEST WITH THE PARAMS OF ID
	await product.delete(id); // WAITS FOR THE PROMISE AND DELETES A CLOTHES ITEM WITH THE ID
	res.status(200).json({ msg: 'deleted!' }); //SENDS A STATUS CODE OF 200 AND A MESSAGE THAT SAYS DELETED
}
//EXPORTS THE THING WE JUST CREATED ON LINE 9
module.exports = productRouter;
