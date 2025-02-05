import { defineLink } from "@medusajs/framework/utils"
import MasFacturaModule from "../modules/masfactura"
import CustomerModule from "@medusajs/medusa/customer"

/**
 * A customer has multiple fiscal data
 */
export default defineLink(
  {
    linkable: MasFacturaModule.linkable.fiscal,
    isList: true
  },
  CustomerModule.linkable.customer
)