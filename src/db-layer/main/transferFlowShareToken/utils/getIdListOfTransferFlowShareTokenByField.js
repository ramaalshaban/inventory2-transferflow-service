const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { TransferFlowShareToken } = require("models");
const { Op } = require("sequelize");

const getIdListOfTransferFlowShareTokenByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    let isValidField = false;

    const transferFlowShareTokenProperties = [
      "id",
      "configName",
      "objectName",
      "objectId",
      "ownerId",
      "peopleOption",
      "tokenPermissions",
      "allowedEmails",
      "expireDate",
    ];

    isValidField = transferFlowShareTokenProperties.includes(fieldName);

    if (!isValidField) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    const expectedType = typeof TransferFlowShareToken[fieldName];

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

    let transferFlowShareTokenIdList =
      await TransferFlowShareToken.findAll(options);

    if (
      !transferFlowShareTokenIdList ||
      transferFlowShareTokenIdList.length === 0
    ) {
      throw new NotFoundError(
        `TransferFlowShareToken with the specified criteria not found`,
      );
    }

    transferFlowShareTokenIdList = transferFlowShareTokenIdList.map(
      (item) => item.id,
    );
    return transferFlowShareTokenIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingTransferFlowShareTokenIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfTransferFlowShareTokenByField;
