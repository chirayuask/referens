# Node.js Invoice Processing Application

This project sets up a Node.js application with Express.js for handling file uploads and processing invoice data from CSV or Excel files.

## Features

- File upload endpoint that accepts CSV or Excel files
- Module to read and parse uploaded files (supports both CSV and Excel formats)
- Validation logic for invoice data
  - Required fields are present
  - Date formats are correct
  - Numeric values are valid
  - Invoice numbers are unique
- Error reporting with an "Errors" column added to the file
- JSON structure creation for valid invoices, including multiple line items per invoice
- Mock service call for creating invoices (simulated with `console.log`)
- Error handling throughout the process
