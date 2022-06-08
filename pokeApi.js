
const dataApiPokemon = async () => {

    try{
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
        const data = await res.json();
        data.results.map(dataPoke => console.log(dataPoke))




    } catch(error){

        console.log(error)

    }


}
dataApiPokemon()



//var  express = require('express');
var  mysql = require('mysql');



var  app = express();

//establceer parametros
var  conexion = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    dataBase:'pokemon'


})

conexion.connect(function(error){

    if(error){

        throw error;
    }else{
        console.log('conexion exitosa')
    }


})


app.get('/', function(req,res){

    res.send('Ruta INICIO');

})

const puerto = process.env.PUERTO || 3307;

app.listen(puerto, function(){

    console.log("Servidor Ok en puerto: "+puerto);
});