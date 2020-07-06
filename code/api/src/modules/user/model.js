'use strict'

// The user table in the database is defined here (created by migrations)
// User
module.exports = function(sequelize, DataTypes) {
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
    // Feature: Add style attribute
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
