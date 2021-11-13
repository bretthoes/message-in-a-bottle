module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quizId: DataTypes.INTEGER
    })

    return Question
  }