import { defineLink } from "@medusajs/framework/utils"
import MasFacturaModule from "../modules/masfactura"
import OrderModule from "@medusajs/medusa/order"

/**
 * A order has only one taxinvoice
 */
export default defineLink(
    OrderModule.linkable.order,
    MasFacturaModule.linkable.taxinvoice
)