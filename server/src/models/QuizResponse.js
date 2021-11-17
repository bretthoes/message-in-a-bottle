module.exports = (sequelize, DataTypes) => {
    const QuizResponse = sequelize.define('QuizResponse', {
      QuizId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      answerKey: DataTypes.STRING
    })

    QuizResponse.associate = function (models) {
      QuizResponse.belongsTo(models.Quiz)
      QuizResponse.belongsTo(models.User)
    }

    return QuizResponse
  }