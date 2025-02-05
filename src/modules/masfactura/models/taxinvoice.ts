import { model } from "@medusajs/framework/utils"

const TaxInvoice = model.define("taxinvoice", {
  id: model.id().primaryKey(),
  country: model.text(),
  data: model.json()
})

export default TaxInvoice

