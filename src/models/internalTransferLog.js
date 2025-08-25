const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Audit log for all significant transfer-related events (status changes, line changes, cancellations). Records past state for traceability.
const InternalTransferLog = sequelize.define(
  "internalTransferLog",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    internalTransferId: {
      // Pointer to the overall transfer this log event refers to.
      type: DataTypes.UUID,
      allowNull: false,
    },
    transferLineId: {
      // Line-level event, pointer to which line/book was involved, nullable.
      type: DataTypes.UUID,
      allowNull: true,
    },
    eventType: {
      // Type of event (created, statusChanged, lineAdded, lineUpdated, lineRemoved, canceled, completed, etc.).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "created",
    },
    oldStatus: {
      // Previous status for status change/cancel events (nullable/optional for most other events).
      type: DataTypes.STRING,
      allowNull: true,
    },
    newStatus: {
      // New status for status change/cancel events (nullable for most other events, mirrors internalTransfer.status).
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      // Description, comment, or note for this event/change.
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

module.exports = InternalTransferLog;
