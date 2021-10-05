//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js'); //traigo todo lo de express
const { conn, Country } = require('./src/db.js');//traigo la conexion con sequelize y la tabla
const axios = require ('axios').default;

// Syncing all the models at once.
 
conn.sync({ 
  force: true 
})
.then(async () => { 

    const apiCountry = await axios.get('https://restcountries.com/v2/all');
    
       // peticion a la api, recorro y traigo lo que necesito
       let apiCountries = apiCountry.data
       apiCountries = apiCountries.map( c => {
           return {
                    name: c.name,
                    flag: c.flag,
                    continent: c.region,
                    capital: c.capital && c.capital[0] || 'Capital not found',
                    subregion: c.subregion,
                    area: c.area,
                    population: c.population,
                }
        });  
        //console.log(apiCountries)
await Country.bulkCreate(apiCountries);

console.log("Base de datos conectada");
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
