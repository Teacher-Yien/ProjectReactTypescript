const mongoose = require('mongoose');

const Data = new  mongoose.Schema({
	id:Number,name:String,price:Number,qty:Number,range:[String],image:String
})

const exData = mongoose.model('ProductDetails',Data);

module.exports = exData;