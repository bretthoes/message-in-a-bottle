const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  // used by bcrypt in hashing password
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
      allowNull: false,
      min: 4,
      max: 16
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      min: 4,
      max: 30
    },
    blobUrl: {
      type: DataTypes.BLOB,
      get () {
        const data = this.getDataValue('blobUrl')
        return data ? data.toString('base64') : ''
      }
    },
    imageType: {
      type: DataTypes.STRING
    },
    birthdate: DataTypes.DATE,
    location: DataTypes.STRING,
    biography: DataTypes.STRING(1234),
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 4,
      max: 64
    },
    resetLink: {
      type: DataTypes.STRING,
      default: ''
    }
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })
  User.associate = function (models) {
    User.hasMany(models.QuizResponse, { onDelete: 'cascade' })
  }

  // Compare password stored in bcrypt against model password
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}