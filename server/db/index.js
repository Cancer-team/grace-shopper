//this is the access point for all things database related!

const db = require("./db");
const Sequelize = require("sequelize");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
//associations could go here!

const Cart = db.define("cart", {
  quantity: Sequelize.INTEGER,
});

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });
User.hasMany(Order);
Order.belongsTo(User);
// Product.belongsToMany(Order, {through})

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
  },
};
