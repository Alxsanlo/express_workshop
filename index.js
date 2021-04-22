//const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//app.use(bodyParser.json());
//pp.use(bodyParser.urlencoded({ extended: true}));

/* 
Verbos HTTP 

GET 	- Obtener recursos.
POST 	- Almacenar recursos.
PATCH	- Modificar una parte de un recurso.
PUT		- Modificar un recurso completo.
DELETE	- Borrar un recurso.
*/

app.get("/", (req, res, next) => {
	return res.status(200).json({ code: 1, message: "Bienvenido al Pokedex"}); //Forma diferente
});

app.use("/pokemon", pokemon);
app.use("/user", user);

app.use((req, res, next) =>{
	return res.status(404).json({code: 404, message: "URL no encontrada"});
});


app.listen(process.env.PORT ||  3000, () => {
	console.log("Server is running...");
});