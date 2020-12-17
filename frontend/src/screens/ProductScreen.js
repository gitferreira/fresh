import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { detailsProduct } from "../actions/productActions";
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';


// import data from "../data";

export default function ProductScreen(props) {

	// const product = data.products.find(x => x._id === props.match.params.id)
	const dispatch = useDispatch()
	const productId = props.match.params.id;
	const [qty, setQty] = useState(1);
	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		loading: loadingReviewCreate,
		error: errorReviewCreate,
		success: successReviewCreate,
	} = productReviewCreate;

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');





	useEffect(() => {

		if (successReviewCreate) {
			window.alert('Review Submitted Successfully');
			setRating('');
			setComment('');
			dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
		}

		dispatch(detailsProduct(productId))
	}, [dispatch, productId, successReviewCreate]);

	const addToCartHandler = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	}


	const submitHandler = (e) => {
		e.preventDefault();
		if (comment && rating) {
			dispatch(
				createReview(productId, { rating, comment, name: userInfo.name })
			);
		} else {
			alert('Please enter comment and rating');
		}
	};


	return (

		<div>

			<div>


				{loading ? (<LoadingBox></LoadingBox>)
					:
					error ? (<MessageBox variant="danger">{error}</MessageBox>)
						:
						(
							<div>
								<img className="wave-product" src="https://raw.githubusercontent.com/jlop007/outdoors-website/master/tours/images/wave-large.png" alt="weave" />
								<div className="product-screen">

									<Link to="/">Back to Results</Link>
									<div className="row top">
										<div className="col-2">
											<img className="large" src={product.image} alt={product.name} />
										</div>
										<div className="col-1">
											<div className="card card-body box">
												<ul>
													<li>
														<h1>{product.name} </h1>
													</li>
													<li>
														<Rating
															rating={product.rating} numReviews={product.numReviews}>
														</Rating>
													</li>
													<br />
													<li>
														<strong> Price: </strong> {product.price}€
													</li>
													<br />
													<li>
														<strong> Description: </strong>
														<p>{product.description} </p>
													</li>
												</ul>
											</div>
										</div>
										<div className="col-1">
											<div className="card card-body box">
												<ul>
													<li>
														<div className="flex-row">
															<h2> Seller:   <Link to={`/seller/${product.seller._id}`}>   {product.seller.seller.name} </Link></h2>
														</div>


														<Rating rating={product.seller.seller.rating}
															numReviews={product.seller.seller.numReviews}> </Rating>
													</li>
													<li>
														<div className="row">
															<div><strong>Price: </strong></div>
															<div className="price">{product.price}€ </div>
														</div>
													</li>
													<li>
														<div className="row">
															<div><strong> Status: </strong></div>

															<div> {product.countInStock > 0 ? (<span className="success">In Stock</span>)
																: (<span className="danger">Not in Stock</span>)}
															</div>

														</div>
													</li>
													{
														product.countInStock > 0 && (
															<>
																<li>
																	<div className="row">
																		<div><strong> Quantity: </strong></div>
																		<div>
																			<select value={qty} onChange={event => setQty(event.target.value)}>
																				{
																					[...Array(product.countInStock).keys()].map(
																						(x) => (
																							<option key={x + 1} value={x + 1}>{x + 1}</option>
																						)
																					)
																				}
																			</select>
																		</div>
																	</div>

																</li>
																<li>
																	<button onClick={addToCartHandler} className="primary block">Add to Cart</button>
																</li>
															</>
														)
													}

												</ul>
											</div>

										</div>


									</div>
								
									{product.reviews.length === 0 && (
										<MessageBox>There is no review</MessageBox>
									)}
									<div className="review-container ">
										{product.reviews.map((review) => (
											<div className="reviews" key={review._id}>
												<strong>{review.name}</strong>
												<Rating rating={review.rating}   caption=" " numReviews={product.numReviews}></Rating>
												<p><strong>Date: </strong>{review.createdAt.substring(0, 10)}</p>
												<p>{review.comment}</p>
											</div>
										))}

										<div className="review-box card card-body">
											{userInfo ? (
												<form className="form" onSubmit={submitHandler}>
													<div>
														<h2>Write a Review</h2>
													</div>
													<div>
														<label htmlFor="rating"><strong>Rating </strong></label>
														<select
															id="rating"
															value={rating}
															onChange={(e) => setRating(e.target.value)}
														>
															<option value="">Select...</option>
															<option value="1">1- Poor</option>
															<option value="2">2- Fair</option>
															<option value="3">3- Good</option>
															<option value="4">4- Very good</option>
															<option value="5">5- Excelent</option>
														</select>
													</div>
													<div>
														<label htmlFor="comment"><strong>Comment </strong></label>
														<textarea
															id="comment"
															value={comment}
															onChange={(e) => setComment(e.target.value)}
														></textarea>
													</div>
													<div>
														<label />
														<button className="primary" type="submit">
															Submit
                   									   </button>
													</div>
													<div>
														{loadingReviewCreate && <LoadingBox></LoadingBox>}
														{errorReviewCreate && (
															<MessageBox variant="danger">
																{errorReviewCreate}
															</MessageBox>
														)}
													</div>
												</form>
											) : (
													<MessageBox>
														Please <Link to="/signin">Sign In</Link> to write a review
													</MessageBox>
												)}
										</div>
									</div>
								</div>



							</div>
						)
				}
			</div>
		</div>


	)
}