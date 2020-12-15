import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";


export default function Product(props) {
  const { product } = props
  return (


    <div className="card1">
      <Link to={`/product/${product._id}`}>
        <div className="front">
          <img src={product.image} alt={product.name} />
        </div>
      </Link>

      <div className="back">
        <Link to={`/product/${product._id}`}>
          <div className="back-content middle">

            <h2 className="product-name">{product.name}</h2>

            <Rating className="product-rating" rating={product.rating} numReviews= {product.numReviews} />
            <p className="product-description">{product.description}</p>
            <div className="price-box">
              <h2 className="product-price">{product.price}€</h2>
            </div>

          </div>
        </Link>
      </div>


    </div>






    // <div key={product._id} className="card">

    //   {/* Link, a diferencia de los anchor tags no refresca la página, mejor para una singlepage */}

    //   <Link to={`/product/${product._id}`}>

    //     <img className="medium"
    //       src={product.image}
    //       alt={product.name} />
    //   </Link>

    //   <div className="card-body">
    //     <Link to={`/product/${product._id}`}>
    //       <h2>{product.name}</h2>
    //     </Link>

    //     <Rating rating={product.rating} numReviews={product.numReviews} />

    //     <div className="price">
    //       {product.price}€
    // 				    </div>

    //   </div>
    // </div>


  )
}
