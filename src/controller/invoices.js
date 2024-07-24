import env from "../config/env.js";
import fs from "fs";
import { sendReponse } from "../helpers/response.js";
import processInvoiceData from '../lib/processInvoiceData.js'
export const getInvoicesTemplate = async (req, res) => {
  try {
    let fixture = `${env.TEMPLATE_FILE_PATH}/${env.FILE_NAME}`;
    const ifExists = fs.existsSync(fixture);
    if (!ifExists) {
      return sendReponse(res, {
        code: 404,
        response: null
      })
    }
    return res.status(200).download(fixture, (err,) => {
      if (err) throw err;
      console.log("File Downloaded successfully...!!!");
    });
  } catch (error) {
    return sendReponse(res, {
      code: 500,
      response: error
    })
  }
};


export const generateInvoiceUpload = async (req, res) => {
  try {
    console.log(req.file)
    let { processedFailed, processedSuccess } = await processInvoiceData(req.body, req.file);
    return sendReponse(res, {
      code: 200,
      response: {
        message: `Out of ${req.body.length} data ${processedSuccess} processed successfully and ${processedFailed} failed to processed.
      You can download the sheet using below url for detailed logs`,
        url: `${env.BASE_URL}/uploads/${req.file.filename}`,
      }
    })
  } catch (error) {
    console.err('error', error);
    return sendReponse(res, {
      code: 500,
      response: error
    })
  }
}