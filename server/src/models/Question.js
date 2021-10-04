module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      title: DataTypes.STRING,
      quizId: DataTypes.INTEGER
    })

    return Question
  }