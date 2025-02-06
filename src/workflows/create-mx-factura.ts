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
    fiscalId: string,
    order: any
}

const createFacturaStep = createStep(
    "create-factura",
    // async (null, { container }) => {
    async (input: CreateFacturaInput, { container }) => {
        const linkDefs: LinkDefinition[] = []
        const masFacturaService: MasFacturaModuleService = container.resolve(MASFACTURA_MODULE)
        try {
            const fiscalInfo = await masFacturaService.retrieveFiscal(input.fiscalId)
            const order = input.order
            const factura = await masFacturaService.createMexicanFactura(fiscalInfo, order)
            // console.log("factura", factura)
            // store the result in the database
            
            const taxInvoice = await masFacturaService.createTaxInvoices({
                country: fiscalInfo.country,
                data: factura
            })
            console.log("taxInvoice", taxInvoice.id)
            // for every parcel, check if exists and if not create it, and if yes, update it
            console.log("order id ", input.orderId)
            linkDefs.push({
                [Modules.ORDER]: {
                    "order_id": input.orderId
                },
                [MASFACTURA_MODULE]: {
                    "taxinvoice_id": taxInvoice.id
                },
            })
            console.log("linkDefs", linkDefs)
            
        return new StepResponse({success: true, taxInvoice: factura, linkDefs})
        } catch (error) {
            console.error("Error in createFiscalStep ", error)
            return new StepResponse({
                success: false, 
                taxInvoice: {} as any,
                linkDefs: []
            })
        }
    }
) 

export const createFacturaMXWorkflow = createWorkflow(
    "create-factura",
    (input: CreateFacturaInput) => {
      const facturaResult = createFacturaStep(input)
      createRemoteLinkStep(facturaResult.linkDefs)
      return new WorkflowResponse({ 
        success: true, 
        taxInvoice: facturaResult.taxInvoice
      })
    }
  )