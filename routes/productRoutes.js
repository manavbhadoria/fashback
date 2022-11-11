const { Router } = require('express');
const productController = require('../controllers/productController');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/Auth');
const router = Router();


router.post('/createproduct', productController.createproduct);
//paginate product
router.get('/paginate',productController.paginate);

module.exports = router;
