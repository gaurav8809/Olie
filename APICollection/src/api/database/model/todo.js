module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      test: {
        type: Sequelize.STRING
      }
    });
  
    return Todo;
};