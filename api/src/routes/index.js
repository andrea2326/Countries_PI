const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoutes = require('./countries.js');
const activityRoutes = require('./activities.js')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countriesRoutes)
router.use('/activities', activityRoutes)

//ruta para el landing 
router.get('/', (req,res)=>{
    //res.send("INDEX /")
    //aca iria el landing page cone l boton
})



module.exports = router;
