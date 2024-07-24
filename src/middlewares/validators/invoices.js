import { csvToJson } from "../../utils/convertCsvToJson.js";
import fs from "fs";
import env from "../../config/env.js";
import { sendReponse } from "../../helpers/response.js";
export const validateData = async (req, res, next) => {
  try {
    let ifExists = fs.existsSync(req.file?.path);
    if (!ifExists)
      return sendReponse(res, {
        code: 500,
        response: "File Not Uploaded",
      })
    let jsonResults = await csvToJson(req.file);
    // Unlink the csv uploaded file.
    // fs.unlink(req.file.path, (err,) => {
    //   if (err) throw err
    //   else console.log('File Unlink successfully...!!!')
    // });


    let validation = ValidateHeadersInTemplate(jsonResults[0])
    if (!validation) return sendReponse(res, {
      code: 422,
      response: {
        message: "Invalid Sheet Format. Do download the sheet with below url and upload again.",
        url: `${env.BASE_URL}/api/v1/getCustomerBookDataTemplate`,
      }
    })
    else if (jsonResults.length < 2) {
      return sendReponse(res, {
        code: 404,
        response: {
          message: "Data is missing",
        }
      })
    } else {
      req.body = jsonResults;
      next();
    }
  } catch (error) {
    return sendReponse(res, {
      code: 500,
      response: error
    })
  }
};


function ValidateHeadersInTemplate(data) {
  return data &&
    data.hasOwnProperty("Invoice Number") &&
    data.hasOwnProperty("Invoice Date") &&
    data.hasOwnProperty("Total Amount") &&
    data.hasOwnProperty("Customer Name") &&
    data.hasOwnProperty("Item Description") &&
    data.hasOwnProperty("Item Quantity") &&
    data.hasOwnProperty("Item Price") &&
    data.hasOwnProperty("Item Total")
}