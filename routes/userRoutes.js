const { Router } = require('express');
const userController = require('../controllers/userController');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/Auth');
const router = Router();


router.delete('/:id',userController.deleteuser);
router.get('/getuser', userController.getuser);

module.exports = router;
