module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    title: DataTypes.STRING
  })

  return Quiz
}