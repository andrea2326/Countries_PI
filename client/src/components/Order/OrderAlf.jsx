import React from "react";
import { useDispatch } from "react-redux";
import { orderAbc } from "../../actions/actions";


export default function OrderAlf({order, setOrder}){
    const dispatch = useDispatch();

    function handleOnClick(e){
        if(order === "ASC"){
            dispatch(orderAbc(order));
            return setOrder("DESC")
        } else if(order === "DESC"){
            dispatch(orderAbc(order))
            return setOrder("ASC")
        }
    }
    return (
        <div>
            <button onClick={(e) => { handleOnClick(e)}}>Ordenar alfabeticamente</button>
        </div>
    )
};