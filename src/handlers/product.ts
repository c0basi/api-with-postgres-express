import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, Application } from 'express';
import { Product, ProductList } from '../models/product';
import authjwToken from '../middleware/authenticatejwt';

dotenv.config()
const access_token = process.env.ACCESS_TOKEN_SECRET!
const product = new ProductList();

const index = async (req: Request, res: Response) =>{
    try{
        const allProducts = await product.index();
        res.json(allProducts);
    }catch(err){
        console.log(`Error returning the products. ${err}`);
        res.json(err);
        
    }   
}

const show = async (req: Request, res: Response) =>{
    try{
        const item = await product.show(req.params.id);
        res.json(item);
    }catch(err){
        console.log(`Could not show user with the id ${req.params.id}. ${err}`);
        res.status(400).json(err);     
    }
}

const create = async (req: Request, res: Response) =>{
    try{
        const inputProduct: Product = {
            product_name: req.body.name,
            product_price: req.body.price,
            product_category: req.body.category
        }
        const newProduct = await product.create(inputProduct);
        res.json(newProduct);

    }catch(err){
        console.log(`Could not create user`);
        res.status(400).json(err);   
    }
}

const remove = async (req: Request, res: Response) =>{
    try{
        const productId = req.params.id;
        const removedProduct = await product.delete(productId);
    }catch(err){
        console.log(`Error removing product . ${err}`);
        res.status(400).json(err); 
        
    }
}

const product_endpoints = (app: Application) =>{
    app.get('/products', authjwToken, index),
    app.get('/products/:id', authjwToken, show),
    app.post('/products', create),
    app.delete('/products/delete/:id', remove)
};

export default product_endpoints;