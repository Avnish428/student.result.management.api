module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define(
    "students",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      familyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  Students.associate = models => {
    Students.hasMany(models.results, {
      foreignKey: { name: "studentId", allowNull: false },
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Students;
};
