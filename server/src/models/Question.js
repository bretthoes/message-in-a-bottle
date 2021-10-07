module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      text: DataTypes.STRING
    })

    Question.associate = function (models) {
      Question.belongsTo(models.Quiz)
    }

    return Question
  }