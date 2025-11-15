const { sequelize } = require('../server');
const { DataTypes } = require('sequelize');

const TypeProduct = sequelize.define('TypeProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'TypeProduct name cannot be empty' },
      len: {
        args: [3, 50],
        msg: 'TypeProduct name must be between 3 and 50 characters'
      }
    }
  }
}, {
  tableName: 'type_products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = TypeProduct;
