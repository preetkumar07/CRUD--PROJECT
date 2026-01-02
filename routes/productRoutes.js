const express = require('express');

const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { requireRole } = require('../middlewares/authMiddleware');

// 👀 Public (sirf login required, role nahi)
router.get('/', getProducts);
router.get('/:id', getProduct);

// 🛒 Admin + ShopOwner
router.post('/', requireRole('admin','shopowner'), createProduct);
router.put('/:id', requireRole('admin','shopowner'), updateProduct);

// ❌ Sirf Admin
router.delete('/:id', requireRole('admin'), deleteProduct);


module.exports = router;
