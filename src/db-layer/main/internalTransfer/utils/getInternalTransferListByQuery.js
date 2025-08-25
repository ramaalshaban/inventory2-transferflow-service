const { HttpServerError, BadRequestError } = require("common");

const { InternalTransfer } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getInternalTransferListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const internalTransfer = await InternalTransfer.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!internalTransfer || internalTransfer.length === 0) return [];

    //      if (!internalTransfer || internalTransfer.length === 0) {
    //      throw new NotFoundError(
    //      `InternalTransfer with the specified criteria not found`
    //  );
    //}

    return internalTransfer.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferListByQuery",
      err,
    );
  }
};

module.exports = getInternalTransferListByQuery;
