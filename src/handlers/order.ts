import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, Application } from 'express';
import authjwToken from '../middleware/authenticatejwt';

import { Order, OrderList } from '../models/order';

const order = new OrderList();

const create = async (req: Request, res: Response) => {
	try {
		const input_order: Order = {
			order_status: req.body.status,
			user_id: req.body.id,
		};
		const newOrder = await order.create(input_order);
		res.json(newOrder);
	} catch (err) {
		console.log(`Could not create error. ${err}`);
		res.status(400).json(err);
	}
};

const index = async (req: Request, res: Response) => {
	try {
		const allOrders = await order.index();
		res.json(allOrders);
	} catch (err) {
		console.log(`Could not get a list of orders. ${err}`);
		res.status(400).json(err);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const orderId = parseInt(req.params.id);
		const selectedOrder = order.show(orderId);
		res.json(selectedOrder);
	} catch (err) {
		console.log(`Could not get order`);
		res.status(400).json(err);
	}
};
// gets the orders made my user with the specified id
const orderByUser = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.id);
		const selectedOrders = await order.orderByUser(userId);
		res.json(selectedOrders);
	} catch (err) {
		console.log(`Could not get the orders fro the user ${req.params.id}`);
		res.status(400).json(err);
	}
};

const completedOrders = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.id);
		const finishedOrders = order.completedOrders(userId);
		res.json(finishedOrders);
	} catch (err) {
		console.log(`Could not get the completed order for user ${req.params.id} `);
		res.status(400).json(err);
	}
};

const addProduct = async (req: Request, res: Response) => {
	try {
		const quantitiy = req.body.quantity;
		const orderId = req.params.id;
		const productId = req.body.id;
		const cart = await order.addProduct(quantitiy, orderId, productId);
		res.json(cart);
	} catch (err) {
		console.log(`Could not add product to order ${err}`);
		res.status(400).json(err);
	}
};

const order_handlers = (app: Application) => {
	app.get('/orders', authjwToken, index),
		app.get('/orders/:id', authjwToken, show),
		app.post('/orders', create),
		app.get('/orders/complete/:id', authjwToken, completedOrders),
		app.get('/orders/:id/users', authjwToken, orderByUser),
		app.post('/orders/:id/products', addProduct);
};
