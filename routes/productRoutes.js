const express = require('express');

const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { productValidation } = require('../validators/productValidator');
const validate = require('../middlewares/validate');
const { requireRole } = require('../middlewares/authMiddleware');


router.get('/', getProducts);
router.get('/:id', getProduct);

// 🛒 Admin + ShopOwner
router.post('/', requireRole('admin','shopowner'),productValidation,
  validate, createProduct);
router.put('/:id', requireRole('admin','shopowner'),productValidation,
  validate, updateProduct);

// ❌ Sirf Admin
router.delete('/:id', requireRole('admin'), deleteProduct);


module.exports = router;
