module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'manager', 'sales', 'customer'),
      defaultValue: 'customer'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users'
  });

  User.associate = function(models) {
    User.hasMany(models.Deal, {
      foreignKey: 'userId',
      as: 'deals'
    });
    User.hasMany(models.Activity, {
      foreignKey: 'userId',
      as: 'activities'
    });
    User.hasMany(models.Note, {
      foreignKey: 'userId',
      as: 'notes'
    });
    User.hasMany(models.Customer, {
      foreignKey: 'assignedTo',
      as: 'customer'
    });
  };

  return User;
};