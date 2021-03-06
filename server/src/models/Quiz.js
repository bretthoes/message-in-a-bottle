module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    questionCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  Quiz.associate = function (models) {
    Quiz.hasMany(models.Question, { onDelete: 'cascade' })
    Quiz.hasMany(models.QuizResponse, { onDelete: 'cascade' })
  }

  return Quiz
}