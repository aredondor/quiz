var crypto = require('crypto');
// Definicion de la clase User:
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User',
		{ username: {
			type: DataTypes.STRING,
			unique: true, //Indica unico en la tabla
			validate: { notEmpty: { msg: "Falta username" }}
		},
		password: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "Falta password"}},
			set: function (password) { //SET FIJA EL VALOR DEL pASSWORD
// String aleatorio usado como salt.
				this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
				this.setDataValue('password', encryptPassword(password, this.salt));
			}
		},
		salt: {
			type: DataTypes.STRING
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}

 	},
 	{ instanceMethods:{
 		verifyPassword:function(password){
 			return encryptPassword(password,this.salt)===this.password;
 		}
 	}
	});
};

function encryptPassword(password, salt) {
	return crypto.createHmac('sha1', salt).update(password).digest('hex');
};