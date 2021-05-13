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
});


// Categories have many Products
Category.hasMany({
  foreignKey: "category_id", 
  onDelete: "CASCADE", 
});


// Products belongToMany Tags (through ProductTag)



// Tags belongToMany Products (through ProductTag)


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
