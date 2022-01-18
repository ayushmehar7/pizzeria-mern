import React, {useEffect, useState} from "react"
import Loader from "../Loader/loader"
import Error from "../Error/error"
import {useDispatch, useSelector} from "react-redux"
import {getAllPizzas} from "../../actions/pizzaActions"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import Filter from "../Filter/filter"
import PizzaContainer from "../PizzaContainer/pizzaContainer"   
import "./home.css"

const Home = ()=>{
    const dispatch = useDispatch()
    const {pizzas, loading, error, message, filteredPizzas}  = useSelector(state => state.getAllPizzasReducer)
    let pizzasRender = filteredPizzas
    if(!pizzasRender){
      pizzasRender = pizzas
    }
    const pages = Math.ceil(pizzasRender.length/6)
    const [currPage, setCurrPage] = useState(1)
    useEffect(()=>{
      dispatch(getAllPizzas())
    }, [])
    if(error){
      toast.error(message)
      return(
        <Error />
      )
    }
    if(loading){
      return(
        <Loader />  
      )
    }
    const increasePage = ()=>{
        if(currPage === pages){
            return;
        }
        setCurrPage(currPage+1)
    }
    const decreasePage = ()=>{
        if(currPage === 1){
            return
        }
        setCurrPage(currPage-1)
    }
    return (
        <section className="container d-flex flex-column align-items-center">
            <Filter />
            <PizzaContainer pizzas={pizzasRender.slice((currPage-1)*6,currPage*6)} />
            <nav aria-label="Page navigation example" >
                <ul className="pagination">
                    <li className="page-item inactive">
                        <span style={{cursor: "pointer"}} onClick={decreasePage} className="page-link">{"<<"}</span>
                    </li>
                    {[...Array(pages).keys()].map(i=> <li key={i} className={`page-item ${(i+1) === currPage ? "active" : "inactive"}`}>
                        <span style={{cursor: "pointer"}} onClick={()=> setCurrPage(i+1)} className="page-link">{i+1}</span>
                    </li>)}
                    <li className="page-item inactive">
                        <span style={{cursor: "pointer"}} onClick={increasePage} className="page-link">{">>"}</span>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default Home;