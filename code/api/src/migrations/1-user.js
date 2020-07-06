module.exports = {
  up: (queryInterface, Sequelize) => {
    // This migration creates the users table
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
      },
      // Add Style attrubute
        // style: {
        //  allowNull: true,
        //  style: Sequelize.TEXT
        // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // This deletes the users table
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
}
