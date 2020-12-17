import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

// import axios from "axios";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import { listTopSellers } from "../actions/userActions";


export default function HomeScreen() {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const userTopSellersList = useSelector(state => state.userTopSellersList)
  const { loading: loadingSellers, error: errorSellers, users: sellers } = userTopSellersList

  useEffect(() => {

    //Note*: Keep Empty Object in main view to NOT filter by Vendor and get all results.
    dispatch(listProducts({}))
    dispatch(listTopSellers())

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

  }, [dispatch])
  return (

    <div>


      <div className="content">
        <div className="all">
          <div className="textBox">
            <h1>It´s not just Veggies,<br />It´s <span className="fresh">Fresh</span> </h1>
            <p>Order the best of seasonal farm fresh food, great local finds, quick meal solutions,
            incredible new products and exclusives, and all of your favorite grocery brands.
                 <strong> It's supermarket delivery with so much more! </strong>
            </p>
            <Link className="main-button" to="/signin">Sign In</Link>
          </div>
          <div className="section-title">
           
          </div>
        </div>
        <div className="circle"> </div>
        <div className="circle1"> </div>
        <div className="imgBox">

          <img className="logo" src="https://lh3.googleusercontent.com/proxy/tU1guwxZris4AdrKYEcpO6-NZ9j-8XgHgpwprR2YyncxA1oiPHhpnJBkaO6_N063csKjI43shIKWGzDmaPKe-kIK58v4iAT0T9-Mu3rSMlNyH3GH1evW22wfuH8Lgrlj5t2zrA" alt="image" ></img>

        </div>

        <img className="wave" src="https://raw.githubusercontent.com/jlop007/outdoors-website/master/tours/images/wave-large.png" alt="weave" />
        <a href="#sec-2">
          <div class="scroll-down"></div>
        </a>
      </div>






      <div className="section-2" id="sec-2">


        {loadingSellers ? (<LoadingBox></LoadingBox>)
          :
          errorSellers ? (<MessageBox variant="danger">{errorSellers}</MessageBox>)
            :
            (

              <>

                {sellers.length === 0 && <MessageBox> No Sellers Found </MessageBox>}
                <h1>TOP SELLERS</h1>
                <div className="carousel-outer">
                  <Carousel showArrows autoPlay showThumbs={false}>
                    {sellers.map((seller) => (
                      <div key={seller._id}>
                        <Link to={`/seller/${seller._id}`}>
                          <img src={seller.seller.logo} alt={seller.seller.name} />
                          {/* <p className="legend"> {seller.seller.name} </p> */}
                        </Link>

                      </div>
                    ))}

                  </Carousel>

                </div>
              </>
            
            )}
             

      </div>

      <div className="section-3">
      <img className="wave1" src="https://raw.githubusercontent.com/jlop007/outdoors-website/master/tours/images/wave-large-reversed.png" alt="weave" />
        
      <h1>PRODUCTS</h1>
        <div>

          {loading ? (<LoadingBox></LoadingBox>)
            :
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
              :
              (
                <div className="row center">
                 


                  {
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))
                  }

                </div>)
          }
        </div>
      </div>

    </div>
  )
}