const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

//For these tests to work we need to export GetInternalTransferRestController also from file getinternaltransfer.js
describe("GetInternalTransferRestController", () => {
  let GetInternalTransferRestController, getInternalTransfer;
  let GetInternalTransferManagerStub, processRequestStub;
  let req, res, next;

  beforeEach(() => {
    req = { requestId: "req-456" };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    next = sinon.stub();

    // Stub for GetInternalTransferManager constructor
    GetInternalTransferManagerStub = sinon.stub();

    // Stub for processRequest inherited from RestController
    processRequestStub = sinon.stub();

    // Proxyquire module under test with mocks
    ({ GetInternalTransferRestController, getInternalTransfer } = proxyquire(
      "../../../src/controllers-layer/rest-layer/main/internalTransfer/get-internaltransfer.js",
      {
        serviceCommon: {
          HexaLogTypes: {},
          hexaLogger: { insertInfo: sinon.stub(), insertError: sinon.stub() },
        },
        managers: {
          GetInternalTransferManager: GetInternalTransferManagerStub,
        },
        "../../TransferFlowServiceRestController": class {
          constructor(name, routeName, _req, _res, _next) {
            this.name = name;
            this.routeName = routeName;
            this._req = _req;
            this._res = _res;
            this._next = _next;
            this.processRequest = processRequestStub;
          }
        },
      },
    ));
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("GetInternalTransferRestController class", () => {
    it("should extend RestController with correct values", () => {
      const controller = new GetInternalTransferRestController(req, res, next);

      expect(controller.name).to.equal("getInternalTransfer");
      expect(controller.routeName).to.equal("getinternaltransfer");
      expect(controller.dataName).to.equal("internalTransfer");
      expect(controller.crudType).to.equal("get");
      expect(controller.status).to.equal(200);
      expect(controller.httpMethod).to.equal("GET");
    });

    it("should create GetInternalTransferManager in createApiManager()", () => {
      const controller = new GetInternalTransferRestController(req, res, next);
      controller._req = req;

      controller.createApiManager();

      expect(GetInternalTransferManagerStub.calledOnceWithExactly(req, "rest"))
        .to.be.true;
    });
  });

  describe("getInternalTransfer function", () => {
    it("should create instance and call processRequest", async () => {
      await getInternalTransfer(req, res, next);

      expect(processRequestStub.calledOnce).to.be.true;
    });
  });
});
