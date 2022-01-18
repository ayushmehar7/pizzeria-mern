import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogOutAction } from "../../actions/userActions";
import { Link } from "react-router-dom";
import "./navbar.css"


const NavBar = ()=>{
  const {cart} = useSelector(state => state.cartReducer)
  const {user} = useSelector(state => state.userLoginReducer)
  const dispatch = useDispatch()
  const logOut = ()=>{
    dispatch(userLogOutAction())
  }
  return(
  <nav className="navbar sticky-top navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">PIZZERIA</Link>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav ms-auto">
        {user ? <React.Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/me">{user.name}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders">My Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reviews">My Reviews</Link>
          </li>
          <li className="nav-item">
            <span style={{cursor: "pointer"}} className="nav-link" onClick={logOut}>Log Out</span>
          </li>
        </React.Fragment> : <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart {`(${cart.length})`}</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
)}

export default NavBar