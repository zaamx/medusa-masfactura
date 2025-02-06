import { 
    AuthenticatedMedusaRequest, 
    MedusaResponse
  } from "@medusajs/framework";
import { createFacturaMXWorkflow } from "../../../../../../workflows/create-mx-factura"

type CreateFacturaInput = {
    orderId: string,
    fiscalId: string,
    order: any
}

export async function POST(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
    const { orderId, fiscalId, order } = req.body as CreateFacturaInput
    try {   
        const { result } = await createFacturaMXWorkflow(
            req.scope
        ).run({
            input: {
                orderId,
                fiscalId,
                order
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    
}