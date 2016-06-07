var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: './uploads/'});

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index');
});

//Autoload de parametros
router.param('quizId', 		quizController.load);
router.param('userId', 		userController.load);
router.param('commentId', 	commentController.load);

// Definición de rutas de /quizzes
//router.get('/quizzes', quizController.index);
//router.get('/quizzes/:quizId(\\d+)', quizController.show);
router.get('/quizzes.:format?', 				quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?', 	quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', 		quizController.check);
router.get('/author', 							quizController.author);
router.get('/quizzes/new', 						sessionController.loginRequired, quizController.new);
router.post('/quizzes', 						sessionController.loginRequired, 
												upload.single('image'),
												quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit', 		sessionController.loginRequired, 
												quizController.ownershipRequired,
												quizController.edit);
router.put('/quizzes/:quizId(\\d+)', 			sessionController.loginRequired, 
												quizController.ownershipRequired,
												upload.single('image'),
												quizController.update);
router.delete('/quizzes/:quizId(\\d+)', 		sessionController.loginRequired, 
												quizController.ownershipRequired,	
												quizController.destroy);

// Definicion de rutas de comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new', 	sessionController.loginRequired, commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments', 		sessionController.loginRequired, commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/accept', 		sessionController.loginRequired,
																			quizController.ownershipRequired, 
																			commentController.accept);

// Definición de rutas de cuenta
router.get('/users', 							userController.index); // listado usuarios
router.get('/users/:userId(\\d+)', 				userController.show); // ver un usuario
router.get('/users/new', 						userController.new); // formulario sign un
router.post('/users', 							userController.create); // registrar usuario
router.get('/users/:userId(\\d+)/edit', 		sessionController.loginRequired, 
												sessionController.adminOrMyselfRequired,
												userController.edit); // editar información de cuenta
router.put('/users/:userId(\\d+)', 				sessionController.loginRequired, 
												sessionController.adminOrMyselfRequired, 
												userController.update); // actualizar información de cuenta
router.delete('/users/:userId(\\d+)', 			sessionController.loginRequired, 
												sessionController.adminAndNotMyselfRequired,
												userController.destroy); // borrar cuenta

// Definición de rutas de sesion
router.get('/session', 		sessionController.new); // formulario login
router.post('/session', 	sessionController.create); // crear sesión
router.delete('/session', 	sessionController.destroy); // destruir sesión

module.exports = router;

