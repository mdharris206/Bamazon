module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
      product_name: DataTypes.STRING,
        // AllowNull is a flag that restricts a product from being entered if it doesn't
        // have a text value
        //allowNull: false,
        // len is a validation that checks that our product is between 1 and 140 characters
       // validate: {
       //   len: [1, 140]

      department_name: DataTypes.STRING,
        // defaultValue is a flag that defaults a new products complete value to false if
        // it isn't supplied one

      price: DataTypes.INTEGER,
      stock_quantity: DataTypes.INTEGER,
      // createdAt: {
      //   type: DataTypes.DATE(3),
      //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      //   field: 'created_at',
      // },
      // updatedAt: {
      //   type: DataTypes.DATE(3),
      //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
      //   field: 'updated_at',
      // },

    });
    return Product;
  };    
  