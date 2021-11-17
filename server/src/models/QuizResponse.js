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
      QuizResponse.belongsTo(models.Quiz, { onDelete: 'cascade' })
      QuizResponse.belongsTo(models.User, { onDelete: 'cascade' })
    }

    return QuizResponse
  }