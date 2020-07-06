'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  // This defines the users table columsn and datatypes for the DB
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
    // Style will be added here - DataTypes.TEXT, allowNull: true
  })
  // This defines the users relationship to subscriptions
  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }
  // The final step is to return the user in the resolvers files
  return User
}

// Model talks to database, this is where we will add the style column
// The model also returns the actual user object to be called in the resolver files
