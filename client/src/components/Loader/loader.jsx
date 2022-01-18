import React from "react";

const Loader = ()=>(
    <section className="container">
        <div className="flex-column d-flex align-items-center">
            <div className="spinner-grow">
            </div>  
            <h1 className="sr-only mt-3">Loading...</h1>
        </div>      
    </section>
)

export default Loader