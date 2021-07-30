import dotenv from 'dotenv'
import {Pool} from 'pg'


dotenv.config();

const {
    POSTGRES_HOST,
    Database,
    Test_Database,
    User,
    password,
    ENV
} = process.env

// client object set on the value of ENV
let client: Pool = new Pool()

if (ENV === 'test'){
     client = new Pool({
        host: POSTGRES_HOST,
        database: Test_Database,
        user: User,
        password: password
    })
};

if (ENV ==='dev'){
     client = new Pool({
        host: POSTGRES_HOST,
        database: Database,
        user: User,
        password: password
    })

}



export default client;