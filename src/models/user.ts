import client from "../database";

export type User = {
    id?: number,
    firstname: string,
    lastname: string,
    password: string

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
            const sql = 'INSERT INTO users(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [u.firstname, u.lastname, u.password]);
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

    

}