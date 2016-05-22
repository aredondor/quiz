//Definicion del model Quiz:

module.exports = function(sequelize, Datatypes) {
return sequelize.define('Quiz', { question: DataTypes.STRING, answer: DataTypes.STRING});
};
