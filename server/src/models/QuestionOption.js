module.exports = (sequelize, DataTypes) => {
    const QuestionOption = sequelize.define('QuestionOption', {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    QuestionOption.associate = function (models) {
      QuestionOption.belongsTo(models.Question)
    }
    
    return QuestionOption
  }