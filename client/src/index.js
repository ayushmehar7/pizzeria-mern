import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from "./components/Navbar/navbar"
import Home from './components/Home/home';
import {HashRouter as Router, Route} from "react-router-dom"
import { Provider } from 'react-redux';
import store from './store';
import {ToastContainer} from "react-toastify"
import Cart from './components/Cart/cart';
import Login from "./components/LoginForm/login"
import Signup from "./components/SignupForm/signup"
import ForgotPassword from './components/ForgotPassword/forgotPassword';
import Order from "./components/Order/order"
import Me from './components/Me/me';
import Review from "./components/Review/review"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        theme='colored'
        />
      <Route path="/" exact >
          <Home />
      </Route>
      <Route path="/cart" exact>
          <Cart />
      </Route>
      <Route path="/login" exact>
          <Login />
      </Route>
      <Route path="/signup" exact>
          <Signup />
      </Route>
      <Route path="/forgotPassword" exact>
        <ForgotPassword />
      </Route>
      <Route path="/orders" exact>
        <Order />
      </Route>
      <Route path="/me" exact>
        <Me />
      </Route>
      <Route path="/reviews" exact>
        <Review />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
