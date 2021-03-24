const express = require('express');
const pokemon = express.Router()
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.post("/", (req, res, next) =>{
	return res.status(200).send(req.body);
});

pokemon.get('/', async (req, res, next) =>{
	const pkmn = await db.query("SELECT * FROM pokemon");
	console.log(pkmn);
	return res.status(200).send(pkmn);
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) =>{
	const pkmn = await db.query("SELECT * FROM pokemon");
	const id = req.params.id - 1;
	if(id >= 0 && id <= 150){
		return res.status(200).send(pkmn[req.params.id - 1]);
	}
	
	return res.status(404).send("Pokemon no encontrado");
	
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) =>{
	var name = req.params.name + " ";
	const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + name + "'");

	/*
	const name = req.params.name;

	const filtro = pkmn.filter((p) => {
	// Condicion ? valor si verdadero : valor si falso
		return (p.name.toUpperCase() == name.toUpperCase()) && p;
	});
	*/

	(pkmn.length > 0) ? 
		res.status(200).send(pkmn) : 
		res.status(404).send("Pokemon no encontrado");
});


module.exports = pokemon;