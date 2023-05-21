const {Router} = require('express');
const authController = require('../controllers/authControllers')

const router = Router();

router.get('/', authController.test_get);
router.post('/parsepdf', authController.parsepdf_post);


module.exports = router;