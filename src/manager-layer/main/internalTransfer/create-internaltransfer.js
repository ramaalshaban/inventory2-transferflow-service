const InternalTransferManager = require("./InternalTransferManager");
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
const { dbCreateInternaltransfer } = require("dbLayer");

class CreateInternalTransferManager extends InternalTransferManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createInternalTransfer",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: false,
      hasShareToken: false,
    });

    this.dataName = "internalTransfer";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.sourceBranchId = this.sourceBranchId;
    jsonObj.sourceSectionId = this.sourceSectionId;
    jsonObj.destinationBranchId = this.destinationBranchId;
    jsonObj.destinationSectionId = this.destinationSectionId;
    jsonObj.status = this.status;
    jsonObj.reason = this.reason;
    jsonObj.note = this.note;
    jsonObj.transferDate = this.transferDate;
  }

  readRestParameters(request) {
    this.sourceBranchId = request.body?.sourceBranchId;
    this.sourceSectionId = request.body?.sourceSectionId;
    this.destinationBranchId = request.body?.destinationBranchId;
    this.destinationSectionId = request.body?.destinationSectionId;
    this.status = request.body?.status;
    this.reason = request.body?.reason;
    this.note = request.body?.note;
    this.transferDate = request.body?.transferDate;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.sourceBranchId = request.mcpParams.sourceBranchId;
    this.sourceSectionId = request.mcpParams.sourceSectionId;
    this.destinationBranchId = request.mcpParams.destinationBranchId;
    this.destinationSectionId = request.mcpParams.destinationSectionId;
    this.status = request.mcpParams.status;
    this.reason = request.mcpParams.reason;
    this.note = request.mcpParams.note;
    this.transferDate = request.mcpParams.transferDate;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.sourceBranchId == null) {
      throw new BadRequestError("errMsg_sourceBranchIdisRequired");
    }

    if (this.destinationBranchId == null) {
      throw new BadRequestError("errMsg_destinationBranchIdisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.sourceBranchId &&
      !isValidObjectId(this.sourceBranchId) &&
      !isValidUUID(this.sourceBranchId)
    ) {
      throw new BadRequestError("errMsg_sourceBranchIdisNotAValidID");
    }

    // ID
    if (
      this.sourceSectionId &&
      !isValidObjectId(this.sourceSectionId) &&
      !isValidUUID(this.sourceSectionId)
    ) {
      throw new BadRequestError("errMsg_sourceSectionIdisNotAValidID");
    }

    // ID
    if (
      this.destinationBranchId &&
      !isValidObjectId(this.destinationBranchId) &&
      !isValidUUID(this.destinationBranchId)
    ) {
      throw new BadRequestError("errMsg_destinationBranchIdisNotAValidID");
    }

    // ID
    if (
      this.destinationSectionId &&
      !isValidObjectId(this.destinationSectionId) &&
      !isValidUUID(this.destinationSectionId)
    ) {
      throw new BadRequestError("errMsg_destinationSectionIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.internalTransfer?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbCreateInternaltransfer function to create the internaltransfer and return the result to the controller
    const internaltransfer = await dbCreateInternaltransfer(this);

    return internaltransfer;
  }

  async getDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.internalTransferId = this.id;
    if (!this.internalTransferId) this.internalTransferId = newUUID(false);

    const dataClause = {
      id: this.internalTransferId,
      sourceBranchId: this.sourceBranchId,
      sourceSectionId: this.sourceSectionId,
      destinationBranchId: this.destinationBranchId,
      destinationSectionId: this.destinationSectionId,
      status: this.status,
      reason: this.reason,
      note: this.note,
      transferDate: this.transferDate,
    };

    return dataClause;
  }
}

module.exports = CreateInternalTransferManager;
