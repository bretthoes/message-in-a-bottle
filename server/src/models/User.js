const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  // Used by bcrypt in hashing password
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: 'default_profile_picture.png'
    },
    birth_date: DataTypes.DATE,
    location: DataTypes.STRING,
    biography: DataTypes.STRING(1234),
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    password: DataTypes.STRING,
    answerKey: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })

  // Compare password stored in bcrypt against model password
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}