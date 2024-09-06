import { v4 as uuid } from "uuid";
var products = [];

export const postProducts = (req, res)=>{
	const pro = req.body;
	products.push({...pro,id:uuid()})
	res.send("Add products successfully");
}

export const getProducts = (req, res)=>{
	res.send(products);
}

export const  updateProducts = (req, res)=>{
		const proID = products.find(p => p.id === req.params.id);
		proID.Name= req.body.Name;
		proID.price = req.body.price;
		proID.qty = req.body.qty;
		res.send("Update products successfully");
}

export const deleteProducts = (req, res)=>{
		products = products.filter(p => p.id !== req.params.id);
		res.send("Delete products successfully");
}

export const SearchID = (req, res)=>{
		const SingleProducts = products.filter(p => p.id === req.params.id);
		res.send(SingleProducts);
		// res.send("Search ID successfully");
}