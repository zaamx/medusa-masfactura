import { 
    createWorkflow, 
    WorkflowResponse
  } from "@medusajs/framework/workflows-sdk"
  import { 
    createRemoteLinkStep,
  } from "@medusajs/medusa/core-flows"
  import { LinkDefinition } from "@medusajs/framework/types"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import MasFacturaModuleService from "../modules/masfactura/service"
import { MASFACTURA_MODULE } from "../modules/masfactura/"
import { getOrderDetailWorkflow } from "@medusajs/medusa/core-flows"

type CreateFacturaInput = {
    orderId: string,
    fiscalId: string
}

const createFacturaStep = createStep(
    "create-factura",
    // async (null, { container }) => {
    async (input: CreateFacturaInput, { container }) => {
        const linkDefs: LinkDefinition[] = []
        const masFacturaService: MasFacturaModuleService = container.resolve(MASFACTURA_MODULE)
        const orderService = container.resolve(Modules.ORDER)
        try {
            const fiscalInfo = await masFacturaService.retrieveFiscal(input.fiscalId)
            const { result } = await getOrderDetailWorkflow(container)
            .run({
                input: {
                    order_id: input.orderId,
                    fields: ["*", "items.*", "customer.*", "shipping_address.*", "billing_address.*",
                        "status",
                        "summary.*",
                        "total",
                        "subtotal",
                        "tax_total",
                        "discount_total",
                        "discount_subtotal",
                        "discount_tax_total",
                        "original_total",
                        "original_tax_total",
                        "item_total",
                        "item_subtotal",
                        "item_tax_total",
                        "original_item_total",
                        "original_item_subtotal",
                        "original_item_tax_total",
                        "shipping_total",
                        "shipping_subtotal",
                        "shipping_tax_total",
                        "original_shipping_tax_total",
                        "original_shipping_subtotal",
                        "original_shipping_total",
                    ]
                }
            })
            console.log("fiscalInfo", fiscalInfo)
            console.log("order", result) 
            // for every parcel, check if exists and if not create it, and if yes, update it
            // linkDefs.push({
            //     [MASFACTURA_MODULE]: {
            //       "taxinvoice_id": fiscalInfo.id
            //     },
            //     [Modules.ORDER]: {
            //       "order_id": input.orderId
            //     }
            //   })
        return new StepResponse({success: true, order: result, fiscal: fiscalInfo})
        } catch (error) {
            console.error("Error in createFiscalStep ", error)
            return new StepResponse({
                success: false, 
                order: {} as any, 
                fiscal: {
                    id: "",
                    country: "",
                    data: {},
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: null
                }
            })
        }
    }
) 

export const createFacturaMXWorkflow = createWorkflow(
    "create-factura",
    (input: CreateFacturaInput) => {
      const facturaResult = createFacturaStep(input)
      // createRemoteLinkStep(facturaResult.linkDefs)
      return new WorkflowResponse({ 
        success: true, 
        order: facturaResult.order,
        fiscal: facturaResult.fiscal
      })
    }
  )