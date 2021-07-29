import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();
const access_token = process.env.ACCESS_TOKEN_SECRET!

const authjwToken = async(req: Request, res: Response, next: Function) =>{
    try{
        const authToken = req.headers['authorization']
        const token = authToken && authToken.split(' ')[1]
        if(token == null) return res.sendStatus(401);
        jwt.verify(token, access_token);
        next();
    }
    catch(err){
        res.sendStatus(401);
        console.log(err);
        
    }    
}

export default authjwToken;