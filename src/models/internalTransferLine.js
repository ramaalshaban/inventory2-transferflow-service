const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//A line item in an internal transfer, representing a specific book being moved and its quantity, linked to a parent transfer event.
const InternalTransferLine = sequelize.define(
  "internalTransferLine",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    internalTransferId: {
      // Parent transfer event this line belongs to.
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      // Book to be transferred.
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      // Number of copies of the book to transfer (must be positive).
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    note: {
      // Optional note per transfer line (e.g., batch, special instruction).
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      // isActive property will be set to false when deleted
      // so that the document will be archived
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    indexes: [],
  },
);

module.exports = InternalTransferLine;
