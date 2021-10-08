import axios from 'axios';
import {GET_ALL_COUNTRIES, GET_COUNTRIES_BY_NAME, GET_COUNTRIES_BY_ID, ORDER_ABC, ORDER_POPULATION, FILTER_CONTINENT, FILTER_ACTIVITY, GET_ALL_ACTIVITIES} from './constants.js';


// Pido countries a DB
export function getAllCountries(){
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/countries`);
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: json.data
            });
        }catch(error){
            console.log(error);
        };        
    };
};

// Buscar país por nombre-barra de búsqueda
export function getCountriesByName(name){
    return async function(dispatch){
        try{
            var countries = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: GET_COUNTRIES_BY_NAME,
                payload: countries.data // devuelvo lo que devuelve la ruta del back
            });
        }catch(error){
            console.log(error);
        };
    };
};

// Ordenar país segun ID 
export function getCountriesById(idCountry){
    return async function(dispatch){
        try{
            var id = await axios.get(`http://localhost:3001/countries/${idCountry}`);
            return dispatch({
                type: GET_COUNTRIES_BY_ID,
                payload: id.data
            });
        }catch(error){
            console.log(error);
        };
    };
};

// Ordenar alfabeticamente
export function orderAbc(payload){
    return function(dispatch){
        return dispatch({
            type: ORDER_ABC,
            payload
        });
    };
};

// Ordenar por población
export function orderPopulation(payload){
    return function(dispatch){
        return dispatch({
            type: ORDER_POPULATION,
            payload
        });
    };
};

// Filtrar por Continente
export function continentFilter(payload){
    return function(dispatch){
        return dispatch({
            type: FILTER_CONTINENT,
            payload
        });
    };
};

// Pido activities a la DB
export function getAllActivities(){
    return async function(dispatch){
        try{
            var activities = await axios.get('http://localhost:3001/activity');
        return dispatch({
            type: GET_ALL_ACTIVITIES,
            payload: activities.data
        });
        }catch(error){
            console.log(error);
        };
    };
};

// Agregar una activity al country
export function postActivity(payload){
    return async function(dispatch){
        try{
            var post = await axios.post('"http://localhost:3001/activity', payload);
            return post;
        }catch(error){
            console.log(error);
        };
    };
};

// Filtrar por Activity
export function activityFilter(payload){
    return function(dispatch){
        return dispatch({
            type: FILTER_ACTIVITY,
            payload
        });
    };
};

