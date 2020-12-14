import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";

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
		token: generateToken(createdUser),
	})
}))

userRouter.get("/:id", expressAsyncHandler(async (req, res)=>{
	const user = await User.findById(req.params.id)

	if(user){
		res.send(user)
	}
	else {
		res.status(404).send({ message: "User not found"})
	}
}))

userRouter.put("/profile", isAuth, expressAsyncHandler(async(req, res)=>{
	const user = await User.findById(req.user._id)
	if(user) {
		//GET NEW INFO
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email

		//NOTE*: When updating the password, it has to get encrypted again!
		if(req.body.password) {
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
			token: generateToken(updatedUser)
			
		})
	}
}))

export default userRouter;