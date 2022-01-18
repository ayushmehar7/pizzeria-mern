import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {filterPizzasAction} from "../../actions/pizzaActions"

const Filter = ()=>{
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [category, setCategory] = useState("all")
    const filterPizzas = ()=>{
        dispatch(filterPizzasAction(name.toLowerCase(), category))
    }
    return (
        <div className="container shadow-lg p-1 mb-5 bg-white rounded w-75">
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <input className="form-control" placeholder="Search Pizza" onChange={(e)=> setName(e.target.value)} />
                </div>
                <div className="col-md-3" style={{marginLeft: "15px", marginRight: "15px"}}>
                    <select style={{marginTop: "19px"}} className="form-control" onChange={(e)=> setCategory(e.target.value)}>
                        <option value="all">All</option>
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non Veg</option>
                        <option value="special">Special</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <button style={{marginTop: "19px"}} onClick={filterPizzas} className="btn btn-danger">FILTER</button>
                </div>
            </div>
        </div>
        
    )
}

export default Filter