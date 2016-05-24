'use strict';

module.exports = {
 up: function (queryInterface, Sequelize) { //Define como realizar los cambios en la BBDD
 return queryInterface.createTable(
 'Quizzes',
 { id: { type: Sequelize.INTEGER, allowNull: false,
 primaryKey: true, autoIncrement: true,
 unique: true },
 question: { type: Sequelize.STRING,
 validate: { notEmpty: {msg: "Falta Pregunta"} } },
 answer: { type: Sequelize.STRING,
 validate: { notEmpty: {msg: "Falta Respuesta"} } },
 createdAt: { type: Sequelize.DATE, allowNull: false },
 updatedAt: { type: Sequelize.DATE, allowNull: false }
 },
 { sync: {force: true} //Indica que los cambios deben forzarse al arrancar la aplicación si hay alguna incompatibilidad o error
 }
 );
 },

 down: function (queryInterface, Sequelize) { //Define como deshacer los cambios en la BBDD return queryInterface.dropTable('Quizzes');
 }

+};