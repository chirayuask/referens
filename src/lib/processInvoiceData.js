import { printLog } from "../helpers/loggers.js"
import { validateInvoice } from "../utils/convertCsvToJson.js"


export default async (invoiceRequest, fileRequest) => {
    try {

        let { loggingFailure, loggingSuccess } = await validateInvoice(invoiceRequest, fileRequest)
        printLog('invoice_processed_data', 0, JSON.stringify(loggingSuccess))
        printLog('invoice_processed_data', 1, JSON.stringify(loggingFailure))

        return { processedSuccess: loggingSuccess.length, processedFailed: loggingFailure.length }
    } catch (error) {
        throw error
    }
}