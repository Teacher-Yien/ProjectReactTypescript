import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';
import productsUser from './router/ProductsRouter.js';


const app = express();
const  port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use('/',productsUser);
app.get('/',(req, res) => res.send("Hello api express!"));
app.listen(port , ()=> console.log(`listening on port ${port}`));