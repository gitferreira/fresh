import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", expressAsyncHandler(async (req, res) => {

	//Filter products by individual seller

	const seller = req.query.seller || ""
	const sellerFilter = seller ? { seller } : {}
	

	const products = await Product.find({...sellerFilter});
	res.send(products);
}));

productRouter.get("/seed",
	expressAsyncHandler(async (req, res) => {


		const createdProducts = Product.insertMany(data.products);
		res.send({ createdProducts })
	}));

productRouter.get("/:id", expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: "Product Not Found" })
	}
}))

//Product Creation requires Admin + Auth Middlewares

productRouter.post("/", isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
	const product = new Product({
		name: "example" + Date.now(),
		seller: req.user._id,
		image: "/images/p1.jpg",
		price: 10,
		category: "example",
		brand: "example",
		countInStock: 0,
		rating: 0,
		numReviews: 0,
		description: "example",
	})
	const createdProduct = await product.save()
	res.send({ message: "Product was created", product: createdProduct })
}))

productRouter.put("/:id", isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
	const productId = req.params.id;
	const product = await Product.findById(productId)
	if (product) {
		product.name = req.body.name;
		product.price = req.body.price;
		product.image = req.body.image;
		product.category = req.body.category;
		product.countInStock = req.body.countInStock;
		product.brand = req.body.brand;
		product.description = req.body.description;
		const updatedProduct = await product.save()
		res.send({ message: "Product was updated", product: updatedProduct })
	} else {
		res.status(404).send({
			message: "Product not found"
		})
	}
}))

//IMPORTANT NOTE: Auth middleware goes BEFORE Admin middleware ---> WHY????

productRouter.delete("/:id", isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		const deleteProduct = await product.remove()
		res.send({
			message: "Product was deleted",
			product: deleteProduct
		})
	} else {
		res.status(404).send({
			message: "Product was not found"
		})
	}
}))

export default productRouter; 