const User = require('./User');
const Product = require('./Product');
const TypeProduct = require('./TypeProduct');

// ======================
//     ASSOCIATIONS
// ======================

// TypeProduct 1 ────► * Product
TypeProduct.hasMany(Product, {
  foreignKey: 'type_id',
  onDelete: 'CASCADE'
});

// Product * ────► 1 TypeProduct
Product.belongsTo(TypeProduct, {
  foreignKey: 'type_id'
});

module.exports = { User, Product, TypeProduct };
