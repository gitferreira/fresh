import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


export default function RegisterScreen(props) {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const redirect = props.location.search
		? props.location.search.split("=")[1]
		: "/";

	const userRegister = useSelector((state) => state.userRegister)
	const { userInfo, loading, error } = userRegister;


	const dispatch = useDispatch();
	const submitHandler = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords have to be the same") 
		} else {
		//Note*: Don´t forget to import the action!
		dispatch(register(name, email, password))
		}

	};

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, userInfo, redirect])

	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1 className = "form-title">Register</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant = "danger">{error}</MessageBox>}
				{/* NAME */}
				<div>
					<label htmlFor="name"><strong> Name </strong></label>

					<input
						type="text"
						id="name"
						placeholder="Enter your name"
						required
						onChange={(event) => setName(event.target.value)}></input>
				</div>
				{/* EMAIL */}
				<div>
					<label htmlFor="email"><strong>Email</strong></label>

					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						required
						onChange={(event) => setEmail(event.target.value)}></input>
				</div>
				{/* PASSWORD */}
				<div>
					<label htmlFor="password"><strong> Password </strong></label>

					<input
						type="password"
						id="password"
						placeholder="Enter your password"
						required
						onChange={(event) => setPassword(event.target.value)}></input>
				</div>
				<div>
					<label htmlFor="confirmPassword"><strong> Confirm your Password</strong> </label>

					<input
						type="password"
						id="confirmPassword"
						placeholder="Enter your password"
						required
						onChange={(event) => setConfirmPassword(event.target.value)}></input>
				</div>
				<div>
					<label />
					<button className="primary" type="submit">Register</button>
				</div>
				<div>
					<label />
					<div>
						Already have an account? {" "}
						
						<Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
						<p>You can use admin@admin.com & 123 to test all Vendor and Admin features. </p>
					</div>
				</div>
			</form>
		</div>
	)
} 