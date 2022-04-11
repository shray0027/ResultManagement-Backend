const Sequelize = require('sequelize');
const sequelize = new Sequelize('ResultsDB','root','Qwertyuiop@000',{hoat :'127.0.0.1',dialect : 'mysql' ,port:'3306'})    

sequelize.sync({force: false}).then(()=>{
    console.log('Tables syncronized');
})

sequelize.authenticate().then(()=> {
    console.log("Connection has been stablised successfully.");
}).catch(err => {
    console.log("Unable to connect to the database" , err);
})

module.exports = sequelize;
global.sequelize = sequelize;