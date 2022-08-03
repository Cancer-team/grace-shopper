const db = require("../db");
const Sequelize = require("sequelize");

const Card = db.define("card", {
  name: {
    type: Sequelize.STRING,
  },
  cardId: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});
