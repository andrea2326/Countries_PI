const { Router } = require('express');
const { Op } = require('sequelize');
const { Activity, Country, Activity_Country } = require ('../db.js');
const axios = require ('axios');
const router = Router ();

// POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos
router.post("/", async(req,res)=>{
    const{name, difficulty, duration , season, countryId} = req.body
    console.log(req.body)
    try {
        let newActivities = await Activity.create({
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season,
                countryId: countryId
            })
        let countryA = await Country.findByPk(countryId);
        console.log(countryA)
        await countryA.addActivities(newActivities) 
        res.send("Se creo la actividad");
        
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;