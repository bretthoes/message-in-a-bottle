module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    Question.associate = function (models) {
      Question.hasMany(models.QuestionOption)
    }
    Question.associate = function (models) {
      Question.belongsTo(models.Quiz)
    }
    
    return Question
  }