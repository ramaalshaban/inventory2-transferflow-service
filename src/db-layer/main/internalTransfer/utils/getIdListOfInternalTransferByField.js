const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { InternalTransfer } = require("models");
const { Op } = require("sequelize");

const getIdListOfInternalTransferByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    let isValidField = false;

    const internalTransferProperties = [
      "id",
      "sourceBranchId",
      "sourceSectionId",
      "destinationBranchId",
      "destinationSectionId",
      "status",
      "reason",
      "note",
      "transferDate",
    ];

    isValidField = internalTransferProperties.includes(fieldName);

    if (!isValidField) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    const expectedType = typeof InternalTransfer[fieldName];

    if (typeof fieldValue !== expectedType) {
      throw new BadRequestError(
        `Invalid field value type for ${fieldName}. Expected ${expectedType}.`,
      );
    }

    const options = {
      where: isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true },
      attributes: ["id"],
    };

    let internalTransferIdList = await InternalTransfer.findAll(options);

    if (!internalTransferIdList || internalTransferIdList.length === 0) {
      throw new NotFoundError(
        `InternalTransfer with the specified criteria not found`,
      );
    }

    internalTransferIdList = internalTransferIdList.map((item) => item.id);
    return internalTransferIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfInternalTransferByField;
