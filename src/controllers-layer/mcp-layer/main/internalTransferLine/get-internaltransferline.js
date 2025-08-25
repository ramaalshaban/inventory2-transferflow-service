const { GetInternalTransferLineManager } = require("managers");
const { z } = require("zod");

const TransferFlowMcpController = require("../../TransferFlowServiceMcpController");

class GetInternalTransferLineMcpController extends TransferFlowMcpController {
  constructor(params) {
    super("getInternalTransferLine", "getinternaltransferline", params);
    this.dataName = "internalTransferLine";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetInternalTransferLineManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        internalTransferLine: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            internalTransferId: z
              .string()
              .uuid()
              .describe("Parent transfer event this line belongs to."),
            bookId: z.string().uuid().describe("Book to be transferred."),
            quantity: z
              .number()
              .int()
              .describe(
                "Number of copies of the book to transfer (must be positive).",
              ),
            note: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Optional note per transfer line (e.g., batch, special instruction).",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "A line item in an internal transfer, representing a specific book being moved and its quantity, linked to a parent transfer event.",
          ),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      internalTransferLineId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that is queried",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "getInternalTransferLine",
    description: "Get a specific transfer line by id.",
    parameters: GetInternalTransferLineMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const getInternalTransferLineMcpController =
        new GetInternalTransferLineMcpController(mcpParams);
      try {
        const result =
          await getInternalTransferLineMcpController.processRequest();
        //return GetInternalTransferLineMcpController.getOutputSchema().parse(result);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: ${err.message}`,
            },
          ],
        };
      }
    },
  };
};
