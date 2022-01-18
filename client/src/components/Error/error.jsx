import React from "react";
import errorImage from "./exclamation-circle-fill.svg"

const Error = ()=>(
    <section className="container">
        <div className="flex-column d-flex align-items-center">
            <img src={errorImage} alt="error" width="100" height="100"/>
            <h1 className="mt-2">Something went wrong, please try again!</h1>
        </div>      
    </section>
)

export default Error