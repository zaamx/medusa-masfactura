import { model } from "@medusajs/framework/utils"

const Fiscal = model.define("fiscal", {
  id: model.id().primaryKey(),
  country: model.text(),
  data: model.json()
})

export default Fiscal