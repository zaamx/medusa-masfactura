import { 
    AuthenticatedMedusaRequest, 
    MedusaResponse
  } from "@medusajs/framework";
import { createFiscalWorkflow } from "../../../../../workflows/create-fiscal";
import MasFacturaModuleService from "../../../../../modules/masfactura/service"
import { MASFACTURA_MODULE } from "../../../../../modules/masfactura/"



type CreateFiscalInput = {
    customerId: string,
    country: string,
    data: any
}

export async function POST(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
    const customerId = req.auth_context?.actor_id
    const { country, data } = req.body as CreateFiscalInput
    try {   
        const { result } = await createFiscalWorkflow(
            req.scope
        ).run({
            input: {
                customerId,
                country,
                data
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    
}

export async function GET(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
    const customerId = req.auth_context?.actor_id
    
    const query = req.scope.resolve("query")
    try {
        const { data: customers } = await query.graph({
            entity: "customer",
            fields: ["*", "fiscals.*"],
            filters: { id: customerId }
        })
        console.log('customers with fiscal data', customers)
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}