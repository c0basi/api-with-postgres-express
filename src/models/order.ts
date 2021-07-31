import client from "../database";

export type Order = {
    order_status: string,
    user_id: number
};

export class OrderList{
    async completedOrders(userId: number){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
            const result = await conn.query(sql, [userId, 'complete']);
            conn.release;
            return result.rows;
        }catch(err){
            console.log(`Could not get the completed orders for the user ${userId}`);
        }
       
    }

    async orderByUser(userId: number){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) and order_status=($2) ';
            const result = await conn.query(sql, [userId, 'active']);
            conn.release;
            return result.rows;
        }catch(err){
            console.log(`Coulf not ge the orders for the user ${userId}`);
            
        }
    }

    async create(o: Order){
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.order_status, o.user_id]);
            const createdOrder = result.rows[0];
            conn.release();
            return createdOrder;
        }catch(err){
            console.log(`Could not insert the order ${o}.${err}`);
            
        }

    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
          const sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn
              .query(sql, [quantity, orderId, productId])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }
}