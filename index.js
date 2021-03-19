const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/* 
Verbos HTTP 

GET 	- Obtener recursos.
POST 	- Almacenar recursos.
PATCH	- Modificar una parte de un recurso.
PUT		- Modificar un recurso completo.
DELETE	- Borrar un recurso.
*/

app.get("/", (req, res, next) => {
	return res.status(200).send("Bienvenido al Pokedex"); //Forma diferente
});

app.post("/pokemon", (req, res, next) =>{
	return res.status(200).send(req.body.name);
});

app.get('/pokemon', (req, res, next) =>{
	
	return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) =>{
	const id = req.params.id - 1;
	if(id >= 0 && id <= 150){
		
		return res.status(200).send(pokemon[req.params.id - 1]);
	}
	res.status(404);
	res.send("Pokemon no encontrado");
	
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) =>{
	const name = req.params.name;

	const pk = pokemon.filter((p) => {
	// Condicion ? valor si verdadero : valor si falso
		return (p.name.toUpperCase() == name.toUpperCase()) && p;
	});

	(pk.length > 0) ? 
		res.status(200).send(pk) : 
		res.status(404).send("Pokemon no encontrado");
});


app.listen(process.env.PORT ||  3000, () => {
	console.log("Server is running...");
});