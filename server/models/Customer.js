module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true
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
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    postalCode: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    website: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('lead', 'prospect', 'customer', 'inactive'),
      defaultValue: 'lead'
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
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
    tableName: 'customers'
  });

  Customer.associate = function(models) {
    Customer.hasMany(models.Deal, {
      foreignKey: 'customerId',
      as: 'deals'
    });
    Customer.hasMany(models.Invoice, {
      foreignKey: 'customerId',
      as: 'invoices'
    });
    Customer.hasMany(models.Activity, {
      foreignKey: 'customerId',
      as: 'activities'
    });
    Customer.hasMany(models.Note, {
      foreignKey: 'customerId',
      as: 'notes'
    });
    Customer.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'user'
    });
  };

  return Customer;
};