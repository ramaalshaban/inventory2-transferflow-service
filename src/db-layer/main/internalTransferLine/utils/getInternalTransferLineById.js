const { HttpServerError } = require("common");

let { InternalTransferLine } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getInternalTransferLineById = async (internalTransferLineId) => {
  try {
    const internalTransferLine = Array.isArray(internalTransferLineId)
      ? await InternalTransferLine.findAll({
          where: {
            id: { [Op.in]: internalTransferLineId },
            isActive: true,
          },
        })
      : await InternalTransferLine.findOne({
          where: {
            id: internalTransferLineId,
            isActive: true,
          },
        });

    if (!internalTransferLine) {
      return null;
    }
    return Array.isArray(internalTransferLineId)
      ? internalTransferLine.map((item) => item.getData())
      : internalTransferLine.getData();
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLineById",
      err,
    );
  }
};

module.exports = getInternalTransferLineById;
