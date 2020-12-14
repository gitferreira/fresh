import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";


export default function ProductEditScreen(props) {
	const productId = props.match.params.id
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [image, setImage] = useState("")
	const [category, setCategory] = useState("")
	const [brand, setBrand] = useState("")
	const [countInStock, setCountInStock] = useState("")
	const [description, setDescription] = useState("")

	const productDetails = useSelector(state => state.productDetails)
	const { loading, error, product } = productDetails

	//Rename loading, success and error - They already exist with that name
	const productUpdate = useSelector(state => state.productUpdate)
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

	const dispatch = useDispatch()
	useEffect(() => {
		if (successUpdate) {
			props.history.push("/productlist")
		}


		if (!product || product._id !== productId || successUpdate) {
			dispatch({
				type: PRODUCT_UPDATE_RESET
			})

			dispatch(detailsProduct(productId))
		} else {
			setName(product.name)
			setPrice(product.price)
			setImage(product.image)
			setCategory(product.category)
			setBrand(product.brand)
			setCountInStock(product.countInStock)
			setDescription(product.description)
		}

	}, [product, dispatch, productId, successUpdate, props.history])

	const submitHandler = (event) => {
		event.preventDefault()
		//Dispatch Update Action

		dispatch(updateProduct({
			_id: productId,
			name,
			price,
			image,
			category,
			brand,
			countInStock,
			description
		}))

	}

// MULTER INTEGRATION -----------------------------------------------------------------------------------------------------------------

	const [loadingUpload, setLoadingUpload] = useState(false);
	const [errorUpload, setErrorUpload] = useState('');
  
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const uploadFileHandler = async (e) => {
	  const file = e.target.files[0];
	  const bodyFormData = new FormData();
	  bodyFormData.append('image', file);
	  setLoadingUpload(true);
	  try {
		const { data } = await Axios.post('/api/uploads', bodyFormData, {
		  headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${userInfo.token}`,
		  },
		});
		setImage(data);
		setLoadingUpload(false);
	  } catch (error) {
		setErrorUpload(error.message);
		setLoadingUpload(false);
	  }
	};

// MULTER INTEGRATION -----------------------------------------------------------------------------------------------------------------



	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Edit Product {productId} </h1>
				</div>
				{loadingUpdate && <LoadingBox></LoadingBox>}
				{errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
				{loading ? <LoadingBox></LoadingBox> :
					error ? <MessageBox variant="danger">{error}</MessageBox> :
						<>

							<div>
								<label htmlFor="name">Name</label>
								<input id="name"
									type="text"
									placeholder="enter name"
									value={name}
									onChange={(event) => setName(event.target.value)}>
								</input>
							</div>
							<div>
								<label htmlFor="price">Price</label>
								<input id="price"
									type="text"
									placeholder="enter price"
									value={price}
									onChange={(event) => setPrice(event.target.value)}>
								</input>
							</div>
							<div>
								<label htmlFor="image">Image</label>
								<input id="image"
									type="text"
									placeholder="enter image"
									value={image}
									onChange={(event) => setImage(event.target.value)}>
								</input>
							</div>
							{/* MULTER */}
							<div>
								<label htmlFor="imageFile">Image File</label>
								<input type="file" id="imageFile" label="Choose Image"
									onChange={uploadFileHandler}
								></input>
								{loadingUpload && <LoadingBox></LoadingBox>}
								{errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
							</div>

							<div>
								<label htmlFor="category">Category</label>
								<input id="category"
									type="text"
									placeholder="enter category"
									value={category}
									onChange={(event) => setCategory(event.target.value)}>
								</input>
							</div>
							<div>
								<label htmlFor="brand">Brand</label>
								<input id="brand"
									type="text"
									placeholder="enter brand"
									value={brand}
									onChange={(event) => setBrand(event.target.value)}>
								</input>
							</div>
							<div>
								<label htmlFor="countInStock">Count In Stock</label>
								<input id="countInStock"
									type="text"
									placeholder="enter countInStock"
									value={countInStock}
									onChange={(event) => setCountInStock(event.target.value)}>
								</input>
							</div>
							<div>
								{/* Reminder*: 2nd Project suggestion --> Change input for textarea for Desc. */}
								<label htmlFor="description">Description</label>
								<textarea id="description"
									rows="3"
									type="text"
									placeholder="enter description"
									value={description}
									onChange={(event) => setDescription(event.target.value)}>
								</textarea>
							</div>
							<div>
								<label></label>
								<button className="primary" type="submit">
									Update Product
								</button>
							</div>
						</>
				}

			</form>
		</div>
	)
}