const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const {
  InternalTransfer,
  InternalTransferLine,
  InternalTransferLog,
  TransferFlowShareToken,
} = require("models");
const { Op } = require("sequelize");

const getInternalTransferLogAggById = async (internalTransferLogId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const internalTransferLog = Array.isArray(internalTransferLogId)
      ? await InternalTransferLog.findAll({
          where: {
            id: { [Op.in]: internalTransferLogId },
            isActive: true,
          },
          include: includes,
        })
      : await InternalTransferLog.findOne({
          where: {
            id: internalTransferLogId,
            isActive: true,
          },
          include: includes,
        });

    if (!internalTransferLog) {
      return null;
    }

    const internalTransferLogData =
      Array.isArray(internalTransferLogId) && internalTransferLogId.length > 0
        ? internalTransferLog.map((item) => item.getData())
        : internalTransferLog.getData();
    await InternalTransferLog.getCqrsJoins(internalTransferLogData);
    return internalTransferLogData;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLogAggById",
      err,
    );
  }
};

module.exports = getInternalTransferLogAggById;
