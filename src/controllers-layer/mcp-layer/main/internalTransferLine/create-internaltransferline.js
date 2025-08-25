const { CreateInternalTransferLineManager } = require("managers");
const { z } = require("zod");

const TransferFlowMcpController = require("../../TransferFlowServiceMcpController");

class CreateInternalTransferLineMcpController extends TransferFlowMcpController {
  constructor(params) {
    super("createInternalTransferLine", "createinternaltransferline", params);
    this.dataName = "internalTransferLine";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateInternalTransferLineManager(this.request, "mcp");
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
        .describe(
          "Optional note per transfer line (e.g., batch, special instruction).",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createInternalTransferLine",
    description:
      "Create a new transfer line item (for a specific book in the transfer).",
    parameters: CreateInternalTransferLineMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const createInternalTransferLineMcpController =
        new CreateInternalTransferLineMcpController(mcpParams);
      try {
        const result =
          await createInternalTransferLineMcpController.processRequest();
        //return CreateInternalTransferLineMcpController.getOutputSchema().parse(result);
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
