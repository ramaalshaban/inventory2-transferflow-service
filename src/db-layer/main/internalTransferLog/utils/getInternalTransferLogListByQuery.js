const { HttpServerError, BadRequestError } = require("common");

const { InternalTransferLog } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getInternalTransferLogListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const internalTransferLog = await InternalTransferLog.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!internalTransferLog || internalTransferLog.length === 0) return [];

    //      if (!internalTransferLog || internalTransferLog.length === 0) {
    //      throw new NotFoundError(
    //      `InternalTransferLog with the specified criteria not found`
    //  );
    //}

    return internalTransferLog.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLogListByQuery",
      err,
    );
  }
};

module.exports = getInternalTransferLogListByQuery;
