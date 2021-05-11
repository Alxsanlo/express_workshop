//const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routesrs
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//Middelware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
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
	res.status(200);
	res.send("Bienvenido al Pokedex");
});

app.use("/user", user);

app.use(auth);

app.use("/pokemon", pokemon);

app.use(notFound);


app.listen(process.env.PORT ||  3000, () => {
	console.log("Server is running...");
});