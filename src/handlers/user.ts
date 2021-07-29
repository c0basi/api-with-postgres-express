import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, Application } from 'express';
import { User, UserList } from '../models/user';
import authjwToken from '../middleware/authenticatejwt';

dotenv.config()
const access_token = process.env.ACCESS_TOKEN_SECRET!
const user = new UserList();

const index = async(req: Request, res: Response) =>{
    try{
        const allUsers = await user.index();
        res.json(allUsers);

    }catch(err){
        res.status(400);
        res.json(err)
    }
}

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

const show = async(req: Request, res: Response) =>{
    try{
        const shownUser = await user.show(req.params.id);
        res.json(shownUser);  
    }catch(err){
        console.log(`Could not retrive user. ${err}`);
        res.status(400);
        res.json(err);
    }
}

const remove = async(req: Request, res: Response) =>{
    try{
        const removedUser = await user.delete(req.params.id);
        res.json(removedUser);
    }catch(err){
        console.log(`Could not delete user. ${err}`);
        res.status(400);
        res.json(err);
    }
}

// assumes no two users have the same first and last names
const authenticate = async(req: Request, res: Response) =>{
    try{
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        const authenticatedUser = user.authenticate(firstname, lastname, password);
        res.json(authenticatedUser);
    }catch(err){
        console.log(`Problem authenticating user. ${err}`);  
        res.status(401);
        res.send(err);
    }
}

const user_routes = (app: Application )=>{
    app.get('/users', authjwToken, index),
    app.post('/users', create),
    app.delete('/users/delete/:id', authjwToken, remove);
    app.get('/users/:id', authjwToken, show)
};

export default user_routes;