'use strict';
//THIS PULLS IN EXPRESS
const express = require('express');
const cors = require('cors');

//THIS CALLS EXPRESS
const app = express();

//THIS PULLS IN THE 404 ERROR(NOT_FOUND)
const notFoundHandler = require('./error-handlers/404');
//THIS PULLS IN THE 500 ERROR(INTERNAL_SERVER: idk what but something is broken)
const errors = require('./error-handlers/500');
//THIS PULLS IN THE LOGGER TO ADD THE TIMESTAMP
const logger = require('./middleware/logger');
//this pulls in our food router
const foodRouter = require('./routes/food');
//this pulls in the clothes router
const clothesRouter = require('./routes/clothes');
//this pulls in the product router
const productRouter = require('./routes/product');

//middlWare that parses both json and url encoded
app.use(express.json());
app.use(cors());
app.use(logger);
// ROUTES
app.use(foodRouter);
app.use(clothesRouter);
app.use(productRouter);

//Proof of life
app.get('/', (req, res) => {
	res.send('hello world');
});

// ERROR HANDLERS
app.use('*', notFoundHandler);
app.use(errors);

module.exports = {
	server: app,
	start: (port) => {
		app.listen(port, () => console.log(`Server is up at: ${port}`));
	},
};
