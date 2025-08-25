const { HttpServerError } = require("common");

let { InternalTransfer } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getInternalTransferById = async (internalTransferId) => {
  try {
    const internalTransfer = Array.isArray(internalTransferId)
      ? await InternalTransfer.findAll({
          where: {
            id: { [Op.in]: internalTransferId },
            isActive: true,
          },
        })
      : await InternalTransfer.findOne({
          where: {
            id: internalTransferId,
            isActive: true,
          },
        });

    if (!internalTransfer) {
      return null;
    }
    return Array.isArray(internalTransferId)
      ? internalTransfer.map((item) => item.getData())
      : internalTransfer.getData();
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferById",
      err,
    );
  }
};

module.exports = getInternalTransferById;
