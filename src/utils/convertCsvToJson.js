import xlsx from 'xlsx'
import env from '../config/env.js'
/**
 * @param {*} fileDetails 
 * @returns 
 */

const expectedTypes = {
  "Invoice Number": "number",
  "Invoice Date": "date",
  "Customer Name": "string",
  "Total Amount": "number",
  "Item Description": "string",
  "Item Quantity": "number",
  "Item Price": "number",
  "Item Total": "number"
};

export const csvToJson = async (fileDetails) => {
  try {
    // Read the file
    const workbook = xlsx.readFile(fileDetails.path);

    // Get the first worksheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    return xlsx.utils.sheet_to_json(worksheet);

  } catch (error) {
    throw error
  }
};


export const validateInvoice = async (invoiceData, fileData) => {
  try {
    const loggingSuccess = [];
    const loggingFailure = [];
    let processedInvoices = {};
    const headers = [...Object.keys(expectedTypes), "Errors"];
    // Rebuild the data array with the updated rows
    const newData = [headers];
    for (let invoice of invoiceData) {
      let errors = validateInvoiceData(invoice);
      if (errors.length > 0) {
        const failure = [...Object.values(invoice), JSON.stringify(errors)]
        newData.push(failure);
        loggingFailure.push(failure)
      } else if (invoice["Invoice Number"] in processedInvoices) {
        const failure = [...Object.values(invoice), "Duplicate Invoice."]
        newData.push(failure);
        loggingFailure.push(failure);
      } else {
        // Implement a mock service call for creating invoices
        console.log('invoice', invoice);
        processedInvoices[invoice["Invoice Number"]] = true;
        let success = [...Object.values(invoice), "NA"]
        loggingSuccess.push(success);
        newData.push(success);
      }
    }

    const newWorksheet = xlsx.utils.aoa_to_sheet(newData);

    // Replace the old sheet with the new one
    const workbook = xlsx.readFile(fileData.path);

    // Get the first worksheet
    const sheetName = workbook.SheetNames[0];
    workbook.Sheets[sheetName] = newWorksheet;

    xlsx.writeFileXLSX(workbook, fileData.path);
    return { loggingSuccess, loggingFailure }
  } catch (error) {
    throw error
  }
}

function validateInvoiceData(invoiceData) {

  // Array to hold keys with incorrect data types
  const errors = [];

  // Iterate through the keys in the expectedTypes object
  for (const key in expectedTypes) {
    if (invoiceData.hasOwnProperty(key)) {
      // Check if the key is "Invoice Date" and validate it as a date
      if (key === "Invoice Date") {
        if (isNaN(Date.parse(invoiceData[key]))) {
          errors.push({ key: key, value: invoiceData[key] });
        }
      } else {
        // Check if the data type of the value matches the expected type
        if (typeof invoiceData[key] !== expectedTypes[key]) {
          // Add the key-value pair to the errors array if the data type is incorrect
          errors.push({ key: key, value: invoiceData[key] });
        }
      }
    } else {
      // Add the key to the errors array if it is missing in the invoiceData
      errors.push({ key: key, value: 'Missing Key' });
    }
  }

  return errors;
}