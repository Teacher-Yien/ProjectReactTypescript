import express  from 'express';
import { postProducts,getProducts,
	updateProducts,deleteProducts ,SearchID } from '../controller/ProductsController.js';
const productsUser = express.Router();
productsUser.post('/products',postProducts);
productsUser.get('/products',getProducts);
productsUser.put('/products/:id',updateProducts);
productsUser.delete('/products/:id',deleteProducts);
productsUser.get('/products/:id',SearchID);

export default productsUser