import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getCountriesById } from "../../actions/actions";



export default function Detail(){
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getCountriesById(id))
    },[])

    const countryDetail = useSelector(state => state.countryDetail)

    return(
        <div>
            <div>
                <section>
                <Link to='/home'>
                    <button>VOLVER A HOME</button>
                </Link>
                </section>

                <section>
                    <div>
                        <img src={countryDetail?.image} alt='Country Flag'></img>
                    </div>
                    <div>
                        <div>ID:<span>{countryDetail?.id}</span></div>
                        <div>CAPITAL:<span>{countryDetail?.capital}</span></div>
                        <div>POBLACIÖN:<span>{countryDetail?.population} millones</span></div>
                    </div>
                    <div>
                        <div>CONTINENTE:<span>{countryDetail?.region}</span></div>
                        <div>SUB REGIÓN:<span>{countryDetail?.subregion}</span></div>
                        <div>ÁREA:<span>{countryDetail?.area}</span></div>
                    </div>
                </section>

                <section>
                    <section>
                        ACTIVIDADES
                    </section>
                    <section>
                        {countryDetail?.activities?.length ?
                            countryDetail?.activities.map(a => {
                                return (<div key={a.id}>
                                    <p>{a.name}</p>
                                    <p>Dificultad: {a.difficulty}</p>
                                    <p>Duración: {a.duration}</p>
                                    <p>Temporada: {a.season}</p>
                                </div>)
                            }):
                            <p> NO HAY ACTIVIDADES PARA ESTE PAÍS</p>
                        }
                    </section>
                </section>
            </div>
        </div>
    )

};