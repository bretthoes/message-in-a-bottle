module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    questionCount: DataTypes.INTEGER
  })

  return Quiz
}