import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

//express-async-handler dependency to handle loading when errors. 

userRouter.get("/seed", expressAsyncHandler(async (req, res) => {
	const createdUsers = await User.insertMany(data.users);
	res.send({ createdUsers })
}))

userRouter.post("/signin", expressAsyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		if (bcrypt.compareSync(req.body.password, user.password)) {
			res.send({
				_id: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				isSeller: user.isSeller,
				token: generateToken(user),
			});
			return;
		}
	}
	res.status(401).send({ message: "User or password incorrect" })
}))

userRouter.post("/register", expressAsyncHandler(async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),

	})
	const createdUser = await user.save()
	res.send({
		_id: createdUser.id,
		name: createdUser.name,
		email: createdUser.email,
		isAdmin: createdUser.isAdmin,
		isSeller: user.isSeller,
		token: generateToken(createdUser),
	})
}))

userRouter.get("/:id", expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		res.send(user)
	}
	else {
		res.status(404).send({ message: "User not found" })
	}
}))

userRouter.put("/profile", isAuth, expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		//GET NEW INFO
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email

		//Vendor
		if(user.isSeller) {
			user.seller.name = req.body.sellerName || user.seller.name
			user.seller.logo = req.body.sellerLogo || user.seller.logo
			user.seller.description = req.body.sellerDescription || user.seller.description
		}

		//NOTE*: When updating the password, it has to get encrypted again!
		if (req.body.password) {
			user.password = bcrypt.hashSync(req.body.password, 10)
		}
		//SAVE NEW INFO
		const updatedUser = await user.save()
		//SEND NEW INFO TO FRONTEND
		res.send({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			isSeller: user.isSeller,
			token: generateToken(updatedUser)

		})
	}
}))

userRouter.get(
	'/',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const users = await User.find({});
		res.send(users);
	})
);
export default userRouter;

userRouter.delete(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id);
		if (user) {
			if (user.email === 'admin@example.com') {
				res.status(400).send({ message: 'Can Not Delete Admin User' });
				return;
			}
			const deleteUser = await user.remove();
			res.send({ message: 'User Deleted', user: deleteUser });
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);

userRouter.put(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
	  const user = await User.findById(req.params.id);
	  if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isSeller = req.body.isSeller || user.isSeller;
		user.isAdmin = req.body.isAdmin || user.isAdmin;
		const updatedUser = await user.save();
		res.send({ message: 'User Updated', user: updatedUser });
	  } else {
		res.status(404).send({ message: 'User Not Found' });
	  }
	})
  );