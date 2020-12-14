import React, { useEffect } from "react";
// import axios from "axios";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";


export default function HomeScreen() {

  const dispatch = useDispatch();
  const productList = useSelector(state=> state.productList)
  const {loading, error, products} = productList
  useEffect(() => {
    dispatch(listProducts())

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