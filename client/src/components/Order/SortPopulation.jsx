import React from "react";
import { useDispatch } from "react-redux";
import { orderPopulation } from "../../actions/actions";


export default function SortPopulation({ sortByPopulation, setSortByPopulation }){
    const dispatch = useDispatch;

    function handleOnClick(e){
        if(sortByPopulation === "ASC"){
            dispatch(orderPopulation(sortByPopulation))
            return setSortByPopulation("DESC")
        }else{
            dispatch(orderPopulation(sortByPopulation));
            return setSortByPopulation("ASC")
        }
    }
    return (
        <button onClick={(e) => { handleOnClick(e)}}>Ordenar por población</button>
    )
}