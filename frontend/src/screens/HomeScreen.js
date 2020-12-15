import React, { useEffect } from "react";
// import axios from "axios";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";


export default function HomeScreen() {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {

    //Note*: Keep Empty Object in main view to NOT filter by Vendor and get all results.
    dispatch(listProducts({}))

    //React Hooks - https://es.reactjs.org/docs/hooks-intro.html
    // const fetchData = async () => {

    //   // La declaración try...catch señala un bloque de instrucciones a intentar (try), 
    //   // y especifica una respuesta si se produce una excepción (catch).

    //   try {
    //     setLoading(true);
    //     const { data } = await axios.get("/api/products");
    //     setLoading(false);
    //     setProducts(data);
    //   } catch (err) {
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // }
    // fetchData();

  }, [])
  return (

    <div>
      <div className="circle"></div>
      <div className="content">
        <div className="textBox">
          <h1>It´s not just Veggies,<br />It´s <span className = "fresh">Fresh</span> </h1>
          <p>Order the best of seasonal farm fresh food, great local finds, quick meal solutions,
          incredible new products and exclusives, and all of your favorite grocery brands.
             <strong> It's supermarket delivery with so much more! </strong>
          </p>
          <Link className="main-button" to="/signin">Sign In</Link>
        </div>

        <div className="imgBox">
          <img className="logo" src="https://lh3.googleusercontent.com/proxy/8hNTpmkXFewAKk3tgkamHl9daW3Z2Pavz7haAOUmpThMr41fk4fxbBGTLGCTWpwxM_ltHVx-nihnfvpigVZqIcFsHYSnWOX48HKjgDvThQoNl24x_OJJ1-AOLLGxkH-qSps67A" alt="image" ></img>
        </div>
      </div>
      



      {loading ? (<LoadingBox></LoadingBox>)
        :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
          :
          (<div className="row center">

         
            {
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            }
             
          </div>)
      }
    </div>
  )
}