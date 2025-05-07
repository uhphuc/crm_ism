module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'notes'
  });

  Note.associate = function(models) {
    Note.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Note.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
    Note.belongsTo(models.Deal, {
      foreignKey: 'dealId',
      as: 'deal'
    });
  };

  return Note;
};