const { Router } = require('express');
const { Op } = require('sequelize');
const { Activity, Country, Activity_Country } = require ('../db.js'); // estoy importando los modelos conectados


const router = Router ();




router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try{
        let detail = await Country.findAll(); // hago la consulta a mi db, si tengo los datos no hace nada, sino los tiene, los creo...
        if(detail.length === 0) await Country.bulkCreate(apiCountries) 
                                            // busca en el arr y matchea llenando las tablas con lo que necesito, sino lo ignora
        if(name){
            let allCountries = await Country.findAll({
               // atributes: ['id', 'name', 'flag', 'capital', 'region', 'population'], // matcheo paises con nombres pasados por query
                where:{
                    name: {
                        [Op.iLike]: `%${name}%` //descarto problemas de mayus o minus
                    }
                },
            });
            if(allCountries){
                return res.json(allCountries)
            }else{
                return res.send('El país seleccionado no fue encontrado')
            }
        }else{
            let moreCountries = await Country.findAll() //comprobación para que la promise no quede pendiente
            if(moreCountries){
                return res.json(moreCountries)
            } else{
                return res.send('El país seleccionado no fue encontrado')
            }
        }
    }catch(err){                            
        next(err)  
    };
});


const getCountries = async()=>{
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through:{
                attributes: []
            }
        }
    })
}

router.get('/:id', async(req,res)=>{
    const{id} = req.params
    const aCountries = await getCountries();
    try {
        if(id){
        let countriesById = aCountries.filter(el => el.id.toLowerCase() === id.toLowerCase())
        countriesById.length? res.status(200).json(countriesById):
        res.status(400).send('Id inválido') 
        }else{
            return res.send('"No recibi ningun Id"')
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;