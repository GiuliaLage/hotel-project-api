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
