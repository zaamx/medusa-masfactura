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

type CreateFiscalInput = {
    customerId: string,
    country: string,
    data: any
}

const createFiscalStep = createStep(
    "create-fiscal",
    // async (null, { container }) => {
    async (input: CreateFiscalInput, { container }) => {
        const linkDefs: LinkDefinition[] = []
        const masFacturaService: MasFacturaModuleService = container.resolve(MASFACTURA_MODULE)
        try {
            const fiscalData = await masFacturaService.createFiscals({
                country: input.country,
                data: input.data
            })
            // for every parcel, check if exists and if not create it, and if yes, update it
            linkDefs.push({
                [MASFACTURA_MODULE]: {
                  "fiscal_id": fiscalData[0].id
                },
                [Modules.CUSTOMER]: {
                  "customer_id": input.customerId
                }
              })
        return new StepResponse({success: true, fiscalData: fiscalData, linkDefs})
        } catch (error) {
            console.error("Error in createFiscalStep ", error)
            return new StepResponse({success: false, fiscalData: null, linkDefs: []})
        }
    }
)

export const createFiscalWorkflow = createWorkflow(
    "create-fiscal",
    (input: CreateFiscalInput) => {
      const fiscalResult = createFiscalStep(input)
      createRemoteLinkStep(fiscalResult.linkDefs)
      return new WorkflowResponse({ 
        success: true, 
        fiscalData: fiscalResult.fiscalData 
      })
    }
  )