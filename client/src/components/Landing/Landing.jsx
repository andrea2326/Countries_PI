import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>¿Listos para recorrer el mundo?</h1>
            <Link to = '/home'>
                <button>GO</button>
            </Link>
        </div>
    )
}