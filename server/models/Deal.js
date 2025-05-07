module.exports = (sequelize, DataTypes) => {
  const Deal = sequelize.define('Deal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD'
    },
    stage: {
      type: DataTypes.ENUM('lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'),
      defaultValue: 'lead'
    },
    probability: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    expectedCloseDate: {
      type: DataTypes.DATE
    },
    actualCloseDate: {
      type: DataTypes.DATE
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
      allowNull: false,
      references: {
        model: 'customers',
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
    tableName: 'deals'
  });

  Deal.associate = function(models) {
    Deal.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Deal.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
    Deal.hasMany(models.Invoice, {
      foreignKey: 'dealId',
      as: 'invoices'
    });
    Deal.hasMany(models.Activity, {
      foreignKey: 'dealId',
      as: 'activities'
    });
    Deal.hasMany(models.Note, {
      foreignKey: 'dealId',
      as: 'notes'
    });
  };

  return Deal;
};