const { body } = require('express-validator');

exports.productValidation = [
  body('name')
    .notEmpty().withMessage('Product name required'),

  body('price')
    .isNumeric().withMessage('Price must be a number'),

  body('description')
    .optional()
    .isString().withMessage('Description must be text')
];
