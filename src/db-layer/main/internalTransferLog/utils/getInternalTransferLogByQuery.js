const { HttpServerError, BadRequestError } = require("common");

const { InternalTransferLog } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getInternalTransferLogByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const internalTransferLog = await InternalTransferLog.findOne({
      where: { ...query, isActive: true },
    });

    if (!internalTransferLog) return null;
    return internalTransferLog.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLogByQuery",
      err,
    );
  }
};

module.exports = getInternalTransferLogByQuery;
