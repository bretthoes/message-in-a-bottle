module.exports = (sequelize, DataTypes) => {
    const QuestionOption = sequelize.define('QuestionOption', {
      text: DataTypes.STRING
    })

    QuestionOption.associate = function (models) {
      QuestionOption.belongsTo(models.Question)
    }

    return QuestionOption
  }