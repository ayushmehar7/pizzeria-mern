import React from "react"
import PizzaCard from "../PizzaCard/pizzaCard"

const PizzaContainer = ({pizzas})=>{
    return (
      <div className="row w-100">
        {pizzas.map((pizza, i) => <PizzaCard pizza={pizza} key={i}/>)}
      </div>
    )
}
export default PizzaContainer;
