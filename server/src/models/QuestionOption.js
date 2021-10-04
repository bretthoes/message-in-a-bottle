module.exports = (sequelize, DataTypes) => {
    const QuestionOption = sequelize.define('QuestionOption', {
      prompt: DataTypes.STRING,
      questionId: DataTypes.INTEGER
    })

    return Question
  }