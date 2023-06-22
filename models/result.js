module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define(
    "results",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.ENUM("A", "B", "C", "D", "E", "F"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["studentId", "courseId"],
          name: "unique_student_course_combination",
        },
      ],
    }
  );
  Result.associate = (models) => {
    Result.belongsTo(models.students, {
      foreignKey: { name: "studentId", allowNull: false },
      targetKey: "id",
      onDelete: "CASCADE",
    });
     Result.belongsTo(models.course, {
       foreignKey: { name: "courseId", allowNull: false },
         targetKey: "id",
         onDelete: "CASCADE",
     });
  };

  return Result;
};
