import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, Application } from 'express';
import { User, UserList } from '../models/user';
import authjwToken from '../middleware/authenticatejwt';

dotenv.config()
const access_token = process.env.ACCESS_TOKEN_SECRET!
const user = new UserList();

const create = async (req: Request, res: Response)=>{
    try{
        console.log(access_token);
        const input_user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            user_password: req.body.password
        };
        const newUser = await user.create(input_user);
        const token = jwt.sign(newUser, access_token);
        console.log(`Created user: ${token}`);
        res.json(token);
        
    }catch(err){
        console.log(`Error somewhere ${err}`);
        res.json(err);
    }
}

const index = async(req: Request, res: Response) =>{
    try{
        const allUsers = await user.index();
        res.json(allUsers);

    }catch(err){
        res.status(400);
        res.json(err)
    }
}

const user_routes = (app: Application )=>{
    app.get('/users', authjwToken, index),
    app.post('/users', create)
};

export default user_routes;