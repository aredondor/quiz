var path = require('path');
//Cargar modelo ORM
var Sequelize = require('sequelize');
//Usar BBDD SQlite:
// DATABASE_URL= sqlite:///
// DATABASE_STORAGE = qquiz.sqlite
// USAR BBDD Postgres:
// DATABASE_URL = postgres://user:passwd@ohst:port/database
var url, storage
if(!process.env.DATABASE_URL){
url = "sqlite:///";
storage = "quiz.sqlite";
} else {
url = process.env.DATABASE_URL;
storage = process.env.DATABASE_STORAGE || "";
}
var sequelize = new Sequelize(url,{storage: storage,omitNull: true});
//Importar la definicion de la tabla quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz