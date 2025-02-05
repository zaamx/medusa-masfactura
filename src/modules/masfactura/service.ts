import { MedusaService } from "@medusajs/framework/utils"
import { Logger } from "@medusajs/framework/types"
import Fiscal from "./models/fiscal"
import TaxInvoice from "./models/taxinvoice"

type MasFacturaModuleServiceOptions = {
    apiToken: string,
    apiUrl: string,
    xEnviatodoApp: string,
    xApiKey: string,
  }

class MasFacturaModuleService extends MedusaService({
  Fiscal,
  TaxInvoice
}){
    protected readonly options_: MasFacturaModuleServiceOptions
    protected readonly logger_: Logger
  
    constructor(
      { logger }: { logger: Logger },
      options: MasFacturaModuleServiceOptions
    ) {
      // @ts-ignore
      super(...arguments)
      this.options_ = options
      this.logger_ = logger
    }
    /*
    * create a Mexican factura 
    * Receptor Its the fiscal data of the customer whe must require the customer id
    * Order its the order id of the order that we want to create the factura
    * 
    curl --location 'https://api.web.masfactura.app/api/fac-facturas/bill-it/RDI230524EX5' \
--data-raw '{
    "General": {
        "Moneda": "MXN", // from the order
        "MetodoPago": "PUE", // from the order
        "FormaPago": "03", // from the order
        "LugarExpedicion": "52929", // from the order
        "Serie": "A", // from the order
        "Totales": { 
            "ImporteSubtotal": "1.00", // from the order
            "ImporteDescuento": 0, // from the order
            "ImporteIVA": "0.16", // from the order
            "ImporteTotal": "1.16" // from the order
        }
    },
    "Receptor": {
        "Rfc": "XAXX010101000", // from the fiscal data of the customer
        "Nombre": "MOSTRADOR", // from the fiscal data of the customer
        "tipoPersona": 1, // from the fiscal data of the customer
        "RegimenFiscalReceptor": "616", // from the fiscal data of the customer
        "UsoCFDI": "S01", // from the fiscal data of the customer
        "eMail": "NA@GMAIL.COM", // from the fiscal data of the customer
        "Direccion": {
            "Cp": "52937", // from the fiscal data of the customer
            "Calle": "SIN CALLE", // from the fiscal data of the customer
            "NoExterior": "SN", // from the fiscal data of the customer
            "NoInterior": null, // from the fiscal data of the customer
            "Localidad": "0989", // from the fiscal data of the customer
            "Pais": "MEX", // from the fiscal data of the customer
            "Estado": "09", // from the fiscal data of the customercurs
            "Municipio": "015" // from the fiscal data of the customer
        }
    },
    "Conceptos": [
        {
            "ClaveProdServicio": "40101801", // from the order
            "Cantidad": "1", // from the order
            "ClaveUnidad": "H87", // from the order
            "Unidad": "Pieza", // from the order
            "Descripcion": "RADIADOR STD", // from the order
            "ValorUnitario": "1", // from the order
            "Importe": "1", // from the order
            "ObjetoImp": "02", // from the order
            "Descuento": "0" // from the order
        }
    ],
    "Traslados": {
        "Base": 1, // from the order
        "Importe": 0.16, // from the order
        "Impuesto": "002", // from the order
        "TasaOCuota": 0.16, // from the order
        "TipoFactor": "Tasa" // from the order
    }
}'
    */
    async createMexicanFactura(fiscalObject, orderObject) {
        
    }
}

export default MasFacturaModuleService