import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps"

export default function ShippingAdressScreen(props) {

	const userSignin = useSelector(state => state.userSignin)
	const {userInfo} = userSignin;
	const cart = useSelector(state => state.cart)
	const {shippingAddress} = cart
	if(!userInfo) {
		props.history.push("/signin")
	}
	const [fullName, setFullName] = useState(shippingAddress.fullName)
	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)
	const dispatch = useDispatch()
	const submitHandler = (event) => {
		event.preventDefault(); 
		//Dispatch save shipping
		dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
		props.history.push("/payment")
	};
	
	return ( 
		<div>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1 className = "form-title">Shipping Adress</h1>
				</div>

				<div>
					<label htmlFor="fullName"><strong>Address </strong></label>
					<input
						type="text"
						id="fullName"
						placeholder="Enter your full name"
						value={fullName}
						onChange={(event) => setFullName(event.target.value)}
						required>
					</input>
				</div>


				<div>
					<label htmlFor="address"><strong>Address </strong></label>
					<input
						type="text"
						id="address"
						placeholder="Enter your address"
						value={address}
						onChange={(event) => setAddress(event.target.value)}
						required>
					</input>
				</div>

				<div>
					<label htmlFor="city"><strong> City </strong></label>
					<input
						type="text"
						id="city"
						placeholder="Enter your city"
						value={city}
						onChange={(event) => setCity(event.target.value)}
						required>
					</input>
				</div>

				<div>
					<label htmlFor="postalCode"><strong>Postal Code </strong></label>
					<input
						type="text"
						id="postalCode"
						placeholder="Enter your postal code"
						value={postalCode}
						onChange={(event) => setPostalCode(event.target.value)}
						required>
					</input>
				</div>

				<div>
					<label htmlFor="country"><strong>Country </strong> </label>
					<input
						type="text"
						id="country"
						placeholder="Enter your country"
						value={country}
						onChange={(event) => setCountry(event.target.value)}
						required>
					</input>
				</div>
		<div>
			<label />
			<button className = "primary" type= "submit">CONTINUE</button>
		</div>
				
			</form>
		</div>
	)
}