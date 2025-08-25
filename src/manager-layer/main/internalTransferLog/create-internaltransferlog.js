const InternalTransferLogManager = require("./InternalTransferLogManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateInternaltransferlog } = require("dbLayer");

class CreateInternalTransferLogManager extends InternalTransferLogManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createInternalTransferLog",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: false,
      hasShareToken: false,
    });

    this.dataName = "internalTransferLog";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.internalTransferId = this.internalTransferId;
    jsonObj.transferLineId = this.transferLineId;
    jsonObj.eventType = this.eventType;
    jsonObj.oldStatus = this.oldStatus;
    jsonObj.newStatus = this.newStatus;
    jsonObj.note = this.note;
  }

  readRestParameters(request) {
    this.internalTransferId = request.body?.internalTransferId;
    this.transferLineId = request.body?.transferLineId;
    this.eventType = request.body?.eventType;
    this.oldStatus = request.body?.oldStatus;
    this.newStatus = request.body?.newStatus;
    this.note = request.body?.note;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.internalTransferId = request.mcpParams.internalTransferId;
    this.transferLineId = request.mcpParams.transferLineId;
    this.eventType = request.mcpParams.eventType;
    this.oldStatus = request.mcpParams.oldStatus;
    this.newStatus = request.mcpParams.newStatus;
    this.note = request.mcpParams.note;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.internalTransferId == null) {
      throw new BadRequestError("errMsg_internalTransferIdisRequired");
    }

    if (this.eventType == null) {
      throw new BadRequestError("errMsg_eventTypeisRequired");
    }

    // ID
    if (
      this.internalTransferId &&
      !isValidObjectId(this.internalTransferId) &&
      !isValidUUID(this.internalTransferId)
    ) {
      throw new BadRequestError("errMsg_internalTransferIdisNotAValidID");
    }

    // ID
    if (
      this.transferLineId &&
      !isValidObjectId(this.transferLineId) &&
      !isValidUUID(this.transferLineId)
    ) {
      throw new BadRequestError("errMsg_transferLineIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.internalTransferLog?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbCreateInternaltransferlog function to create the internaltransferlog and return the result to the controller
    const internaltransferlog = await dbCreateInternaltransferlog(this);

    return internaltransferlog;
  }

  async getDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.internalTransferLogId = this.id;
    if (!this.internalTransferLogId)
      this.internalTransferLogId = newUUID(false);

    const dataClause = {
      id: this.internalTransferLogId,
      internalTransferId: this.internalTransferId,
      transferLineId: this.transferLineId,
      eventType: this.eventType,
      oldStatus: this.oldStatus,
      newStatus: this.newStatus,
      note: this.note,
    };

    return dataClause;
  }
}

module.exports = CreateInternalTransferLogManager;
