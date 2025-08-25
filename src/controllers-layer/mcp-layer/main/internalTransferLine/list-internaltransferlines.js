const { ListInternalTransferLinesManager } = require("managers");
const { z } = require("zod");

const TransferFlowMcpController = require("../../TransferFlowServiceMcpController");

class ListInternalTransferLinesMcpController extends TransferFlowMcpController {
  constructor(params) {
    super("listInternalTransferLines", "listinternaltransferlines", params);
    this.dataName = "internalTransferLines";
    this.crudType = "getList";
  }

  createApiManager() {
    return new ListInternalTransferLinesManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        internalTransferLines: z
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
          )
          .array(),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {};
  }
}

module.exports = (headers) => {
  return {
    name: "listInternalTransferLines",
    description:
      "List transfer lines (children of a transfer), filterable by parent, book, etc.",
    parameters: ListInternalTransferLinesMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const listInternalTransferLinesMcpController =
        new ListInternalTransferLinesMcpController(mcpParams);
      try {
        const result =
          await listInternalTransferLinesMcpController.processRequest();
        //return ListInternalTransferLinesMcpController.getOutputSchema().parse(result);
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
