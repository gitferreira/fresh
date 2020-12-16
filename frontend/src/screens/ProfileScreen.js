import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

export default function ProfileScreen() {

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	// VENDORS 
	const [sellerName, setSellerName] = useState("")
	const [sellerLogo, setSellerLogo] = useState("")
	const [sellerDescription, setSellerDescription] = useState("")

	const userSignin = useSelector(state => state.userSignin)
	const { userInfo } = userSignin
	const userDetails = useSelector(state => state.userDetails)
	const { user, error, loading } = userDetails;
	const userUpdateProfile = useSelector(state => state.userUpdateProfile)
	const { error: errorUpdate, success: successUpdate, loading: loadingUpdate } = userUpdateProfile
	const dispatch = useDispatch()

	useEffect(() => {
		if (!user) {
			dispatch({
				type: USER_UPDATE_PROFILE_RESET
			})
			dispatch(detailsUser(userInfo._id))
		} else {
			setName(user.name)
			setEmail(user.email)
				// VENDOR
			if(user.seller) { 
			//Acceder a seller a través de user.seller!!!
			setSellerName(user.seller.name)
			setSellerLogo(user.seller.logo)
			setSellerDescription(user.seller.description)	

			}

		}

		//Note**: ES7 Shorcuts extension NOT WORKING - Remember to add manually list of variables as 2nd parameter.
	}, [dispatch, userInfo._id, user])

	const submitHandler = (event) => {
		event.preventDefault()
		//Dispatch update profile
		if (password !== confirmPassword) {
			alert("Passwords have to be the same")
		} else {
			dispatch(updateUserProfile({ userId: user._id, name, email, password, sellerName, sellerLogo, sellerDescription }))
		}

	}

	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1 className = "form-title">User Profile</h1>
				</div>
				{
					loading ? <LoadingBox></LoadingBox>
						:
						error ? <MessageBox variant="danger">{error}</MessageBox>
							:
							<>
								{loadingUpdate && <LoadingBox></LoadingBox>}
								{errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
								{successUpdate && <MessageBox variant="success">Your profile was updated</MessageBox>}
								<div>
									<label htmlFor="name"><strong>Name </strong></label>
									<input id="name" type="text" placeholder="Enter name"
										value={name} onChange={(event) => setName(event.target.value)}></input>
								</div>

								<div>
									<label htmlFor="email"><strong>Email</strong></label>
									<input id="email" type="email" placeholder="Enter email"
										value={email} onChange={(event) => setEmail(event.target.value)}></input>
								</div>

								<div>
									<label htmlFor="password"><strong> Password </strong></label>
									<input id="password" type="password" placeholder="Enter password"
										onChange={(event) => setPassword(event.target.value)} ></input>
								</div>


								<div>
									<label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
									<input id="confirmPassword" type="password" placeholder="Confirm your password"
										onChange={(event) => setConfirmPassword(event.target.value)} ></input>
								</div>

								{/* Check Seller */}
								{
									user.isSeller && (
										<>
										<br/>
											<h2 className = "form-title">Vendor Profile</h2>

											<div>
												<label htmlFor="sellerName"><strong>Vendor Name</strong>  </label>
												<input id="sellerName" type="text" placeholder="Enter Vendor Name"
													value={sellerName} onChange={(event) => setSellerName(event.target.value)}></input>
											</div>

											<div>
												<label htmlFor="sellerLogo"><strong>Logo </strong></label>
												<input id="sellerLogo" type="text" placeholder="Enter logo"
													value={sellerLogo} onChange={(event) => setSellerLogo(event.target.value)}></input>
											</div>

											<div>
												<label htmlFor="sellerDescription"><strong>Vendor Description</strong></label>
												<input id="sellerDescription" type="text" placeholder="Enter Vendor Description"
													value={sellerDescription} onChange={(event) => setSellerDescription(event.target.value)}></input>
											</div>

										</>
									)
								}

								<div>
									<label />
									<button className="primary" type="submit">
										Update
						</button>
								</div>

							</>
				}
			</form>
		</div>
	)
}