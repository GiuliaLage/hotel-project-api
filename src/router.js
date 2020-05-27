const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');


router.get('/' , (req, res) =>{
    return res.json({resposta: true})
});
 
router.get('/users', userController.index); 
router.get('/users/:id', userController.show);
router.post('/users', userController.store);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy); 

module.exports = router; 

// nodemon auxilia no desenvolvimento porque é um file-watcher e faz um auto-start na aplicação 
// toda vez que um arquivo no projeto é modificado. 

//dessa forma quando tentamos rodar node ./src/server.js não funciona porque nesse momento não temos
//um transpilador instalado 

//surcrase transpila o codigo, para uma versão que o node entenda. 
// alternativa ao babel e pelo que pude ver mais rapido em alguns artigos, mais rapido. 


