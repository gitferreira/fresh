import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAdressScreen from "./screens/ShippingAdressScreen";
import SigningScreen from "./screens/SigninScreen";
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import { USER_SIGNOUT } from "./constants/userConstants";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";


function App() {

  //Get number of cart items from store --> Display number of items in cart
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart;

  //Get user info from store --> Display username
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin;
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        
        <header className="row">
          <div>
            <Link className="brand" to="/">fresh</Link>
          </div>

          <div>
            <Link to="/cart" className = "nav-btn">Cart
            {cartItems.length > 0 && (
                <span className="badge">
                  {cartItems.length}</span>
              )}
            </Link>

            {
              userInfo ? (
                <div className="dropdown">

                  <Link className = "nav-btn" to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link className = "nav-btn" to="/profile" >Profile</Link>
                    </li>
                    
                    <li>
                      <Link className = "nav-btn" to="/orderhistory">Orders</Link>
                    </li>
                    <li> 
                    <Link className = "nav-btn" to="#signout" onClick={signoutHandler}> Sign Out</Link>
                    </li>
                  </ul>
                </div>
              ) :
                (
                  <Link className = "nav-btn" to="/signin">Sign In</Link>
                )
            }
             {/*   Only Show for seller users --> admin@admin.com  */}
              {userInfo && userInfo.isSeller && (
                <div className="dropdown2">
                <Link className = "nav-btn" to="#admin">
                  Vendor <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown2-content">
                 
                  <li>
                    <Link className = "nav-btn" to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link className = "nav-btn" to="/orderlist/seller">Orders</Link>
                  </li>

                </ul>
              </div>
              )}




             {/*   Only Show for admin users --> admin@admin.com  */}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown2">
                <Link className = "nav-btn" to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown2-content">
                  <li>
                    <Link className = "nav-btn" to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link className = "nav-btn" to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link className = "nav-btn" to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link className = "nav-btn" to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}


          </div>
        </header>
        <main>
          <Route path = "/seller/:id" component = {SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigningScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAdressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path = "/productlist" component = {ProductListScreen} exact ></AdminRoute>
          <AdminRoute path = "/orderlist" component = {OrderListScreen} exact ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <SellerRoute path = "/productlist/seller" component = {ProductListScreen}></SellerRoute>
          <SellerRoute path = "/orderlist/seller" component = {OrderListScreen}></SellerRoute>
          <Route path="/" component={HomeScreen} exact></Route>
          

        </main>
        <footer className="row center">
          All rights reserved
          
		</footer>
      </div>
    </BrowserRouter >
  );
}

export default App;
