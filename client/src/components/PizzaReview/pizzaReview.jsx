import React from "react";

const PizzaReview = ({review})=>{
    return (
        <div className="card" style={{width: "18rem", display: "inline-block", marginRight: "10px", marginBottom: "10px"}}>
            <div className="card-header">
                <i className="fas fa-star"/> {review.rating}/5
            </div>
            <div className="card-body">
            <blockquote className="blockquote mb-0">
                <p style={{fontSize: "15px"}}>{review.text}</p>
                <footer className="blockquote-footer"><cite style={{fontSize: "12px"}}>{review.user.name}</cite></footer>
            </blockquote>
            </div>
        </div>
    )
}

export default PizzaReview