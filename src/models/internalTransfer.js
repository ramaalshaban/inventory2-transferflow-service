const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a transfer request/event moving one or more books between a source and destination branch/section. Stores status, audit trail, and basic transfer metadata.
const InternalTransfer = sequelize.define(
  "internalTransfer",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    sourceBranchId: {
      // Originating branch for the books being transferred.
      type: DataTypes.UUID,
      allowNull: false,
    },
    sourceSectionId: {
      // Originating section of the branch, if applicable. Nullable.
      type: DataTypes.UUID,
      allowNull: true,
    },
    destinationBranchId: {
      // Destination branch for the transfer.
      type: DataTypes.UUID,
      allowNull: false,
    },
    destinationSectionId: {
      // Destination section in branch; nullable if not by section.
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      // Current transfer status (initiated, in transit, completed, canceled).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "initiated",
    },
    reason: {
      // Reason for this transfer (e.g., stock balancing, request). Optional.
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      // Optional additional notes for this transfer event/request.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    transferDate: {
      // Date/time when transfer was initiated or is to take effect. Defaults to creation time.
      type: DataTypes.DATE,
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

module.exports = InternalTransfer;
