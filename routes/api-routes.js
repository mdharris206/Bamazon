// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function(app) {

  // GET route for getting all of the products
  app.get("/api/products", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Product.findAll({}).then(function(dbProduct) {
      // We have access to the products as an argument inside of the callback function
      res.json(dbProduct);
    });

  });

  // POST route for saving a new product
  app.post("/api/products", function(req, res) {
    // create takes an argument of an object describing the item we want to insert
    // into our table. In this case we just we pass in an object with a text and
    // complete property
    db.Product.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbProduct) {
      // We have access to the new product as an argument inside of the callback function
      res.json(dbProduct);
    });

  });

  // DELETE route for deleting products. We can get the id of the product to be deleted
  // from req.params.id
  app.delete("/api/products/:id", function(req, res) {
    // Destroy takes in one argument: a "where object describing the products we want to destroy
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });

  });

  // PUT route for updating products. We can get the updated product data from req.body
  app.put("/api/product/:id", function(req, res) {
      console.log(req.params);
      console.log(req.body);
    // Update takes in two arguments, an object describing the properties we want to update,
    // and another "where" object describing the products we want to update
    db.Product.update(
        req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });

  });
};
