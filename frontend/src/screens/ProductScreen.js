import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
// import data from "../data";

export default function ProductScreen(props) {

	// const product = data.products.find(x => x._id === props.match.params.id)
	const dispatch = useDispatch()
	const productId = props.match.params.id;
	const [qty, setQty] = useState(1);
	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(detailsProduct(productId))
	}, [dispatch, productId]);

	const addToCartHandler = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	}
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
							<div   className = "product-screen">
							
							<Link to="/">Back to Results</Link>
							<div className="row top">
								<div className="col-2">
									<img className="large" src={product.image} alt={product.name} />
								</div>
								<div className="col-1">
								<div className="card card-body">
									<ul>
										<li>
											<h1>{product.name} </h1>
										</li>
										<li>
											<Rating
												rating={product.rating} numReviews={product.numReviews}>
											</Rating>
										</li>
										<br/>
										<li>
											<strong> Price: </strong> {product.price}€
								</li>
								<br/>
										<li>
											<strong> Description: </strong>
								<p>{product.description} </p>
											</li>
									</ul>
									</div>
								</div>
								<div className="col-1">
									<div className="card card-body">
										<ul>
											<li>
												<div className = "flex-row">
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
							</div>
						</div>
					)
			}
			</div>
		</div>


	)
}