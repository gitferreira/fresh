import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


export default function SigningScreen(props) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const redirect = props.location.search
		? props.location.search.split("=")[1]
		: "/";

	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo, loading, error } = userSignin;


	const dispatch = useDispatch();
	const submitHandler = (event) => {
		event.preventDefault();
		//Note*: Don´t forget to import the action!
		dispatch(signin(email, password))
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
					<h1>Sign In</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant = "danger">{error}</MessageBox>}
				{/* EMAIL */}
				<div>
					<label htmlFor="email">"Email"</label>

					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						required
						onChange={(event) => setEmail(event.target.value)}></input>
				</div>
				{/* PASSWORD */}
				<div>
					<label htmlFor="password">"Password"</label>

					<input
						type="password"
						id="password"
						placeholder="Enter your password"
						required
						onChange={(event) => setPassword(event.target.value)}></input>
				</div>
				<div>
					<label />
					<button className="primary" type="submit">Signin</button>
				</div>
				<div>
					<label />
					<div>
						New Customer? {" "}

						{/* Redirect the User to the natural next step instead of Homepage. */}
						<Link to={`/register?redirect=${redirect}`}>Create your account</Link>
					</div>
				</div>
			</form>
		</div>
	)
} 