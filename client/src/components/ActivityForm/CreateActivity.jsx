import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, postActivity } from "../../actions/actions";


function validate(activityPost){
    let errors = {}
    if(!activityPost.name){
        errors.name = 'Se requiere completar el nombre';
    };
    if(activityPost.difficulty > 5 || activityPost.difficulty < 1){
        errors.difficulty = 'Se requiere completar dificultad del 1 al 5'
    };
    if(!activityPost.duration){
        errors.duration = 'Se requiere completar duración'
    };
    if(!activityPost.season.length){
        errors.season = 'Se requiere seleccionar temporada de la actividad'
    };
    if(!activityPost.countryId.length){
        errors.countryId = 'Se requiere seleccionar país'
    }
}

export default function CreateActivity(){
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countriesLoad);

    const [errors, setErrors] = useState({});
    const [countryId, setCountryID] = useState([])

    const [activityPost, setAvtivityPost] = useState({ // creo el estado con la actividad que se va a postear
        name: "",
        difficulty:"",
        duration:"",
        season:"",
        countryId: []
    });

    useEffect(() => {
        dispatch(getAllCountries())
    },[])

    function handleSelect(e){
        setAvtivityPost({
            ...activityPost,
            countryId: [
                ...activityPost.countryId, 
                e.target.value]
        });
    };

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postActivity(activityPost))
        setAvtivityPost({
            name: "",
            dificulty:"",
            duration:"",
            season:"",
            countryId: []
        });
    };

    function handleChange(e){
        setAvtivityPost({
            ...activityPost,
            [e.target.value]: e.target.value
        });
        setErrors(validate({
            activityPost,
            [e.target.value]: e.target.value
        }))
    };

    return(
        <div>
            <h1>Crea la actividad tursística</h1>
            <div>
            <Link to='/home'>
                {/* Botón para volver al home */}
                <button>Volver a Home</button>
            </Link>
            </div>

            <div>
                {/* Formulario de actividades */}
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <div>
                        <label>Selecciona el País </label>
                        <select name='countryId' onChange={(e) => {handleSelect(e)}}>
                            <option>Paises</option>
                            {
                                countries.map(count =>(<option key={count.id} value={count.id}>{count.name}</option>))
                            }
                        </select>
                        {
                            errors.countryId && ( <p>{errors.countryId}</p> )
                        }
                    </div>
                    <div>
                        <label>Nombre de la Actividad</label>
                        <input type='text' value={activityPost.name} name='name' placeholder='Nombre...'
                        onChange={(e) =>{handleChange(e)}}/>
                        {
                            errors.name && ( <p>{errors.name}</p> )
                        }
                    </div>
                    <div>
                        <label>Dificultad</label>
                        <input type='text' value={activityPost.difficulty} name='difficulty' placeholder='Dificultad...'
                        onChange={(e) =>{handleChange(e)}}/>
                        {
                            errors.difficulty && (<p>{errors.difficulty}</p>)
                        }
                    </div>
                    <div>
                        <label>Duración</label>
                        <input type='text' value={activityPost.duration} name='duration' placeholder='Duración...'
                        onChange={(e) =>{handleChange(e)}}/>
                        {
                        errors.duration && ( <p>{errors.duration}</p> )
                        }
                    </div>
                    <div>
                        <label>Temporada del año</label>
                        <select type='text' value={activityPost.season} onChange={(e) =>{handleChange(e)}}>
                            <option value='temporada'>Temporada</option>
                            <option value='verano'>Verano</option>
                            <option value='otoño'>Otoño</option>
                            <option value='invierno'>Invierno</option>
                            <option value='primavera'>Primavera</option>
                        </select>    
                        {
                            errors.season && (<p>{errors.season}</p>)
                        }
                    </div>
                    <div>
                        <button type='submit'>CREAR ACTIVIDAD</button>
                    </div>
                </form>
            </div>
        </div>

    );
};