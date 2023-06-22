module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "course",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      courseName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    },
  );
  Course.associate = models => {
    Course.hasMany(models.results, {
      foreignKey: { name: "courseId", allowNull: false },
      sourceKey: "id",
      // onDelete: "CASCADE",
    });
    // models.results.belongsTo(Course, {
    //   foreignKey: { name: "courseId", allowNull: false },
    //   targetKey: "id",
    //   onDelete: "CASCADE",
    // });
  };
  return Course;
};
