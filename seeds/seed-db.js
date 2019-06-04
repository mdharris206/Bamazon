const db = require("../models");

const products = [
  {
    product_name: "baking pan",
    department_name: "cookware",
    price: 29.99,
    stock_quantity: 100
  },
  {
    product_name: "soucepan",
    department_name: "cookware",
    price: 49.99,
    stock_quantity: 80
  },
  {
    product_name: "spatula",
    department_name: "cookware",
    price: 9.99,
    stock_quantity: 150
  },
  {
    product_name: "cast iron pan",
    department_name: "cookware",
    price: 79.99,
    stock_quantity: 50
  },
  {
    product_name: "dutch oven",
    department_name: "cookware",
    price: 150.0,
    stock_quantity: 40
  },
  {
    product_name: "other pan",
    department_name: "cookware",
    price: 29.99,
    stock_quantity: 100
  },
  {
    product_name: "other soucepan",
    department_name: "cookware",
    price: 49.99,
    stock_quantity: 80
  },
  {
    product_name: "other spatula",
    department_name: "cookware",
    price: 9.99,
    stock_quantity: 150
  },
  {
    product_name: "cast2 iron pan",
    department_name: "cookware",
    price: 79.99,
    stock_quantity: 50
  },
  {
    product_name: "dutch2 oven",
    department_name: "cookware",
    price: 150.0,
    stock_quantity: 40
  }
];

db.sequelize.sync({force: true}).then(function() {
    db.Product.bulkCreate(products).then(function(rows) {
        console.log('inserted');
    }).catch(function(err) {
        console.log(err);
    });
});