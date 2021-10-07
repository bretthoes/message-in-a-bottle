module.exports = (sequelize, DataTypes) => {
    const QuizResponse = sequelize.define('QuizResponse', {
      userId: DataTypes.INTEGER,
      quizId: DataTypes.INTEGER,
      answerKey: DataTypes.STRING
    })

    QuizResponse.associate = function (models) {
      QuizResponse.hasOne(models.User)
      QuizResponse.hasOne(models.Quiz)
    }

    return QuizResponse
  }