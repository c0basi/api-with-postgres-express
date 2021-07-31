import client from "../database";

export type Product = {
    product_name: string,
    product_price: number,
    product_category: string
};

export class ProductList{
    async index(): Promise<Product[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Could not retrieve list of products. ${err}`)
        }    
    }

    async show(id: string): Promise<Product>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];

        }catch(err){
            throw new Error(`Error retrieving product with id ${id}. ${err}`)
        }
    }

    async create(p: Product): Promise<Product>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO products(product_name, product_price, product_category) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [p.product_name, p.product_price, p.product_category]);
            const value = result.rows[0];
            conn.release();
            return value;
        }catch(err){
            throw new Error(`Error creating product. ${err}`);
            
        }
    }

    async delete(id: string): Promise<Product>{
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const value = result.rows[0];
            conn.release();
            return value;

        }catch(err){
            throw new Error(`Could not delete procust with id ${id}. ${err}`);
        }
    }
}