'use strict'

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
    // Style will be added after migration - DataTypes.TEXT
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
