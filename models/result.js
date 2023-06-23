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
        references: {
          model: 'students',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      score: {
        type: DataTypes.ENUM("A", "B", "C", "D", "E", "F"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
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
