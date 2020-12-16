import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET } from "../constants/productConstants";

export default function ProductListScreen(props) {


	//Check if it is seller

	const sellerMode = props.match.path.indexOf("/seller") >= 0

	const productList = useSelector(state => state.productList)
	const { loading, error, products } = productList;

	const productCreate = useSelector(state => state.productCreate)
	//Ojo que no puedes redeclarar product como productCreate! 
	const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate

	//Always before of UseEffect to get rid of the Warning
	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin
	const dispatch = useDispatch()
	useEffect(() => {
		if (successCreate) {
			dispatch({ type: PRODUCT_CREATE_RESET });
			props.history.push(`/product/${createdProduct._id}/edit`);
		  }
		  if (successDelete) {
			dispatch({ type: PRODUCT_DELETE_RESET });
		  }
		  dispatch(listProducts({seller: sellerMode? userInfo._id:"" }));
		}, [createdProduct, dispatch, props.history, successCreate, successDelete]);


		const deleteHandler = (product) => {
			if (window.confirm('Are you sure to delete?')) {
			  dispatch(deleteProduct(product._id));
			}
		  };
	const createHandler = () => {
		dispatch(createProduct())
	}
	return (
		<div>
			<div className="row">
				<h1 className = "table-title">PRODUCTS:</h1>
				<button type="button" className="primary title-btn" onClick={createHandler}>New Product</button>
			</div>

			{loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

			{loadingCreate && <LoadingBox></LoadingBox>}
			{errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}



			{loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) :
				<table className="table">
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							//Key always after map --> Unique value
							<tr key={product._id}>
								<td>
									{product._id}
								</td>
								<td>
									{product.name}
								</td>
								<td>
									{product.price}
								</td>
								<td>
									{product.category}
								</td>
								<td>
									{product.brand}
								</td>
								<td>
									<button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>
										Edit
								</button>

									<button type="button" className="small" onClick={() => deleteHandler(product)}>
										Delete
								</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>}
		</div>
	)
}