import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper: string = process.env.BCRYPT_PASSWORD!
const salt: number = parseInt(process.env.SALT_ROUNDS!)



export type User = {
    id?: number,
    firstname: string,
    lastname: string,
    user_password: string

};

export class UserList {
    async index(): Promise<User[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Could not retrieve users. ${err}`)
        }
    }

    async show(id: string): Promise<User>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release;
            return result.rows[0];

        }catch(err){
            throw new Error(`Error retrieving user with id ${id}. ${err}`)
        }
    }
    async create(u: User): Promise<User>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO users(firstname, lastname, user_password) VALUES($1, $2, $3) RETURNING *';
            const hash = bcrypt.hashSync(u.user_password+pepper, salt)
            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
            const value = result.rows[0];
            conn.release;
            return value;
        }catch(err){
            throw new Error(`Error creating user. ${err}`);
            
        }
    }

    async delete(id: string): Promise<User>{
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql);
            const value = result.rows[0];
            return value;

        }catch(err){
            throw new Error(`Could not delete book. ${err}`);
        }
    }

    async authenticate(firstname: string, lastname: string, password: string): Promise<User|null>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT user_password FROM users WHERE firstname=($1) AND lastname=($2)';
            const result = await conn.query(sql, [firstname, lastname]);
            console.log(password+pepper);
            if(result.rows[0]){
                const user = result.rows[0];
                console.log(user);
               if(bcrypt.compareSync(password+pepper, user.user_password)){
                   return user;
               }else{
                   throw new Error('Incorrect Password. Please try again.')
               }
            }
            return null;
        }catch(err){
            throw(`Could not authenticate. Check password. ${err}`)
        }
    }

    

}