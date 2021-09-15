import  express  from 'express'
import cors from 'cors';
import user_routes from './handlers/user'
import product_endpoints from './handlers/product';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(express.json());
app.use(cors());

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!')
});

user_routes(app);
product_endpoints(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});
