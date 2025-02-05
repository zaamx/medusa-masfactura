import MasFacturaModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const MASFACTURA_MODULE = "masfactura"

export default Module(MASFACTURA_MODULE, {
  service: MasFacturaModuleService,
})