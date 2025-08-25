const { HttpServerError } = require("common");

let { InternalTransferLog } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getInternalTransferLogById = async (internalTransferLogId) => {
  try {
    const internalTransferLog = Array.isArray(internalTransferLogId)
      ? await InternalTransferLog.findAll({
          where: {
            id: { [Op.in]: internalTransferLogId },
            isActive: true,
          },
        })
      : await InternalTransferLog.findOne({
          where: {
            id: internalTransferLogId,
            isActive: true,
          },
        });

    if (!internalTransferLog) {
      return null;
    }
    return Array.isArray(internalTransferLogId)
      ? internalTransferLog.map((item) => item.getData())
      : internalTransferLog.getData();
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLogById",
      err,
    );
  }
};

module.exports = getInternalTransferLogById;
