const { HttpServerError, BadRequestError } = require("common");

const { InternalTransfer } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getInternalTransferByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const internalTransfer = await InternalTransfer.findOne({
      where: { ...query, isActive: true },
    });

    if (!internalTransfer) return null;
    return internalTransfer.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferByQuery",
      err,
    );
  }
};

module.exports = getInternalTransferByQuery;
