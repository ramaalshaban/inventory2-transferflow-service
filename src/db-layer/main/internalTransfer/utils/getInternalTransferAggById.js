const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const {
  InternalTransfer,
  InternalTransferLine,
  InternalTransferLog,
  TransferFlowShareToken,
} = require("models");
const { Op } = require("sequelize");

const getInternalTransferAggById = async (internalTransferId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const internalTransfer = Array.isArray(internalTransferId)
      ? await InternalTransfer.findAll({
          where: {
            id: { [Op.in]: internalTransferId },
            isActive: true,
          },
          include: includes,
        })
      : await InternalTransfer.findOne({
          where: {
            id: internalTransferId,
            isActive: true,
          },
          include: includes,
        });

    if (!internalTransfer) {
      return null;
    }

    const internalTransferData =
      Array.isArray(internalTransferId) && internalTransferId.length > 0
        ? internalTransfer.map((item) => item.getData())
        : internalTransfer.getData();
    await InternalTransfer.getCqrsJoins(internalTransferData);
    return internalTransferData;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferAggById",
      err,
    );
  }
};

module.exports = getInternalTransferAggById;
