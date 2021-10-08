import { ORDER_POPULATION, FILTER_ACTIVITY, FILTER_CONTINENT, GET_ALL_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRIES_BY_NAME, ORDER_ABC, GET_ALL_ACTIVITIES } from '../actions/constants';

const initialState = {
    countriesLoad: [],
    countriesFiltered: [],
    countryDetail: [],
    allActivities: [],
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case GET_ALL_COUNTRIES: {
        return{
            ...state,
            countriesLoad: action.payload,  // Me trae todos los paises q trae la action GET_COUNTRIES
            countriesFiltered: action.payload // para que se filtren todos los paises en la pagina principal
        }
    }

        case FILTER_CONTINENT: {
            const allCountries = state.countriesLoad;
            let continentFilter = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continent === action.payload);
            return {
                ...state,
                countriesFiltered: continentFilter
            }
        }

        case GET_COUNTRIES_BY_NAME: {
            return {
                ...state,
                countriesFiltered: action.payload
            }
        }

        case GET_COUNTRIES_BY_ID:{
            return {
                ...state,
                countryDetail: action.payload
            }
        }
        
        case ORDER_POPULATION: {
            let sortPopulation;

            if(action.payload ==="ASC"){
                sortPopulation = function(a, b){
                    if(a.population > b.population){
                        return 1;
                    }
                    if(a.population < b.population){
                        return -1;
                    }else{

                    } 
                    return 0
                }
            }else{
                sortPopulation = function(a, b){
                    if(a.population > b.population){
                        return -1;
                    }
                    if (a.population > b.population){
                        return 1;
                    }else{

                    }
                    return 0;
                }
            }
            let countriesByPopulation = state.countriesFiltered.sort(sortPopulation)
            return{
                ...state,
                countriesFiltered: countriesByPopulation
            }
        }

        case ORDER_ABC:{
            let orderNameAbc;
            if(action.payload === "ASC"){
                orderNameAbc = function(a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(a.name < b.name){
                        return 1;
                    }else{
                    }
                    return 0;
                }
            }
            let countriesByName = state.countriesFiltered.sort(orderNameAbc)
            return{
                ...state,
                countriesFiltered: countriesByName
            }
        }

        case FILTER_ACTIVITY:{
            const countryActivity = state.allActivities.filter(a => a.name === action.payload)[0].countries.map(countryWithActivity => countryWithActivity)
            //retorna los datos del pais donde se puede realizar esa actividad
            return{
                ...state,
                countriesFiltered: countryActivity
            }
        }
        case GET_ALL_ACTIVITIES:{
            return{
                ...state,
                allActivities: action.payload
            }
        }

        default: 
            return state
    }
}

export default rootReducer;