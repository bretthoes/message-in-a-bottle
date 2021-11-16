module.exports = (sequelize, DataTypes) => {
    const QuizResponse = sequelize.define('QuizResponse', {
      QuizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "Quiz" // define composite key (PKFK) on Quiz
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "User" // define composite key (PKFK) on User
      },
      answerKey: DataTypes.STRING
    })

    return QuizResponse
  }