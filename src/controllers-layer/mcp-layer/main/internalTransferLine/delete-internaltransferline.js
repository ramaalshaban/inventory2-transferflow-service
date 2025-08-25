const { DeleteInternalTransferLineManager } = require("managers");
const { z } = require("zod");

const TransferFlowMcpController = require("../../TransferFlowServiceMcpController");

class DeleteInternalTransferLineMcpController extends TransferFlowMcpController {
  constructor(params) {
    super("deleteInternalTransferLine", "deleteinternaltransferline", params);
    this.dataName = "internalTransferLine";
    this.crudType = "delete";
  }

  createApiManager() {
    return new DeleteInternalTransferLineManager(this.request, "mcp");
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
          "This id paremeter is used to select the required data object that will be deleted",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "deleteInternalTransferLine",
    description: "Remove a transfer line (if not locked).",
    parameters: DeleteInternalTransferLineMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const deleteInternalTransferLineMcpController =
        new DeleteInternalTransferLineMcpController(mcpParams);
      try {
        const result =
          await deleteInternalTransferLineMcpController.processRequest();
        //return DeleteInternalTransferLineMcpController.getOutputSchema().parse(result);
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
