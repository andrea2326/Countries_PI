import React from "react";



export default function Card({name, image, continent}){
    return(
        <div>
            <h2>{name}</h2>
            <h3>{continent}</h3>
            <img src={image} alt="img not found" width="200px" height="250px" />
        </div>
    )
}