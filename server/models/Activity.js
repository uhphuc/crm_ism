module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('call', 'meeting', 'email', 'task', 'other'),
      defaultValue: 'other'
    },
    description: {
      type: DataTypes.TEXT
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('planned', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'planned'
    },
    outcome: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    dealId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'deals',
        key: 'id'
      }
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
    tableName: 'activities'
  });

  Activity.associate = function(models) {
    Activity.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Activity.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
    Activity.belongsTo(models.Deal, {
      foreignKey: 'dealId',
      as: 'deal'
    });
  };

  return Activity;
};