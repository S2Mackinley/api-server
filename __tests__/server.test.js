'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const mockReq = supergoose(server);

describe('***API SERVER TEST: ***', () => {
	let foodTest = { name: 'test1', calories: 999999, type: 'VEG' };

	it('404 on a bad route', async () => {
		let res = await mockReq.get('/foo');
		console.log('inside 404 bad route');
		expect(res.status).toEqual(404);
	});

	it('404 on a bad method', async () => {
		let res = await mockReq.post('/');
		expect(res.status).toEqual(404);
	});

	it('Should create a food item', async () => {
		let res = await mockReq.post('/food').send(foodTest);
		expect(res.status).toEqual(201);
		expect(res.body.name).toEqual(foodTest.name);
		expect(res.body.calories).toEqual(foodTest.calories);
	});

	it('Should read a food item', async () => {
		let newFood = await mockReq.post('/food').send(foodTest);
		let id = newFood.body._id;
		let res = await mockReq.get(`/food/${id}`);
		expect(res.status).toEqual(200);
		expect(res.body.name).toEqual(foodTest.name);
		expect(res.body.calories).toEqual(foodTest.calories);
	});

	it('Should read all food items', async () => {
		let res = await mockReq.get('/food');
		console.log('getAll', res.body);
		expect(res.status).toEqual(200);
	});

	it('Should update food items', async () => {
		let newRecord = { name: 'test99', calories: 0 };
		let oldFood = await mockReq.post('/food').send(foodTest);
		let id = oldFood.body._id;
		let res = await mockReq.put(`/food/${id}`).send(newRecord);
		expect(res.status).toEqual(200);
		expect(res.body.name).toEqual(newRecord.name);
		expect(res.body.calories).toEqual(newRecord.calories);
	});

	it('Should delete a food item', async () => {
		let newFood = await mockReq.post('/food').send(foodTest);
		let id = newFood.body._id;
		let res = await mockReq.delete(`/food/${id}`);
		expect(res.status).toEqual(200);
		let getResponse = await mockReq.get(`/food/${id}`);
		expect(getResponse.body).toEqual(null);
	});
});
