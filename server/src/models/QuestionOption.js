module.exports = (sequelize, DataTypes) => {
    const QuestionOption = sequelize.define('QuestionOption', {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      questionId: DataTypes.INTEGER
    })

    return QuestionOption
  }