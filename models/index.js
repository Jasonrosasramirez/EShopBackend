// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// This script joins the seperate scripts together. 

// Products belongsTo Category
Product.belongsTo(Category, {
  // product is the category
  // belongsTo | automatically lookups an artical that has the asme id as the category_id column

  foreignKey: "category_id", // refering to the main 
  onDelete: "CASCADE", // del;ete the rows and child records
});


// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});


// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "Product_Key", 
  unique: false 
});


// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id"
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
