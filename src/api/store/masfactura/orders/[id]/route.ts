import { 
    AuthenticatedMedusaRequest, 
    MedusaResponse
  } from "@medusajs/framework";


export async function GET(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
    const { id: orderId } = req.params
    const query = req.scope.resolve("query")
    try {   
        console.log("orderId", orderId)
        const { data } = await query.graph({
            entity: "order",
            fields: [
              "taxinvoice.*",
            ],
            filters: {
              id: orderId,
            },
          })
          
          console.log(data)

        res.status(200).json(data[0].taxinvoice)
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: error.message })
    }
    
}