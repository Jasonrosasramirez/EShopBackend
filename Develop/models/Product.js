// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {

    // an array of objects. The objects being the table column properties. 

    id: { // column heading is id.
      type: DataTypes.INTEGER, // the kind of data accepted in this column.
      allowNull: true, // input cannot be null (left empty).
      primaryKey: true, // this is the primary key. This is the main grouping within this table. 
      autoIncrement: true // increases the id count per entry. 
    },

    product_name: { 
      type: DataTypes.STRING,
      allowNull: true
    }, 

    price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull:false, 
      validate: {
        isDecimal: true
      }
    }, 

    stock: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defualtValue: 10, 
      validate: {
        isNumeric: true
      }
    }, 

    category_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: "category", 
        key: "id", 
        unique: false
      }
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }

);

module.exports = Product;


