import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, continentFilter, getCountriesByName, getAllActivities, activityFilter} from "../../actions/actions";
import { Link } from "react-router-dom";
import Card from "../Country/CountryCard";
import SortPopulation from "../Order/SortPopulation";
import OrderAlf from "../Order/OrderAlf";
import Paginado from "../Paginado/Paginado";



export default function Home (){
    const dispatch = useDispatch(); // despacho mis actions utilizando la const
    const allCountries = useSelector ((state) => state.countriesFiltered);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("ASC");
    const [sortByPopulation, setSortByPopulation] = useState("ASC");

    const [currentPage, setCurrentPage] = useState(1);             // Refiere al nro de pag
    const [countriesPerPage] = useState(9);   // Refiere al nro de paises visibles en 1 pag
    const indexOfLastCountries = currentPage * countriesPerPage;   // Indica hasta que pais muestra cada pag
    const indexOfFirstCountries = indexOfLastCountries - countriesPerPage;   // Indica desde que pais mostrar cada pag
    const currentCountries = allCountries.slice(indexOfFirstCountries, indexOfLastCountries); // Paises que se muestran en la pag

    // Me ayuda al renderizado 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const allActivities = useSelector(state => state.allActivities)


    // Me traigo todos los paises cuando renderiza el componente
    useEffect (() =>{
        dispatch(getAllCountries()) 
        dispatch(getAllActivities())
    },[dispatch]);

    //Traigo todos los paises
    function onClickCountries(e){
        e.preventDefault();
        dispatch(getAllCountries()); // Resetea para que no booguee
    }

    // Despacho la accion que filtra por continente con e.t.v (La acc modifica el estado de countriesFiltered)
    function handleByContinent(e){
        dispatch(continentFilter(e.target.value));
    }

    
    function handleSearchByName(e){
        e.preventDefault();
        dispatch(getCountriesByName(search)); // Llamo a la función que busca por nombre
        setSearch("")
        // console.log(search)
    }

    function handleNameInput(e){
        setSearch(e.target.value) // seteo el estado interno que creé para luego enviarlo en la funcion
    }

    function handleFilterAtivity(e){
        dispatch(activityFilter(e.target.vale))
    }

    return (
        <div>
            <section>

                <div>
                    {/* Link para ir a la sección que crea una nueva actividad */}
                    <Link to='/postActivity'>
                        <button>CREAR NUEVA ACTIVIDAD</button>
                    </Link>
                </div>
                <div>
                    <from onSubmit={(e) => {handleSearchByName(e)}}>
                        <h2>Buscá tu país</h2>
                        <input type='text' value={search} name='Nombre' placeholder='País...' 
                            onChange={(e) => { handleNameInput(e) }}>
                        </input>
                        <button type='submit' onClick={e =>handleSearchByName(e)}></button>
                    </from>
                </div>

                <div>
                <label>FILTRAR POR ACTIVIDAD</label>
            
                <select onChange={e => handleFilterAtivity(e)}>
                 <option>Actividad</option>
                        {allActivities?.length && allActivities.map(a => {
                         return(
                            <option ley={a.id} value={a.name}>{a.name}</option>
                             )
                            })
                         }

                </select>
            </div>
            </section>
            {/* Filtrados */}
             <section></section>

                {/* Búsqueda por país */} {/* Botón para cargar todos los paises */}
            <div>
                <button type= "submit" onClick ={(e)=>{onClickCountries(e)}}>Cargar todas los paises</button>
            </div>
            <div>
                <OrderAlf order={order} setOrder={setOrder} />
            </div>
            <div>
                <select>
                    <option value="ALL">Orden</option>
                    <option value="ASC">Ascendente</option>
                    <option value="DESC">Descendente</option>
                </select>
            </div>
            <div>
                <SortPopulation sortByPopulation={sortByPopulation} setSortByPopulation={setSortByPopulation} />         
            </div>
        

            <div>
                {/* filtrado por continente */}
                <select onChange = {e => handleByContinent(e)}> 
                    <option value='All'>Continentes</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oseania'>Oseania</option>
                    <option value='Polar'>Polar</option>
                </select>
                </div>
                <Paginado
                countriesPerPage = {countriesPerPage} 
                allCountries = {allCountries.length} 
                paginado = {paginado}
                />

                {/* Seccion donde renderizo las cards */}
            {
                currentCountries?.map(el => {
                    return(
                        <div>
                        <Link to={'/countries/' + el.id}>
                            <Card name={el.name} image={el.flag} continent={el.continent} key={el.id}/>
                        </Link>
                        </div>
                    )
               })
            }
            
        </div>
    )
};