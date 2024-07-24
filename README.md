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

## Usage

1. Start the server:
   npm start
2. Cretae .env File using the following key-value pairs
    SERVER_PORT = 3000
    BASE_URL = 'http://localhost:3000/'
    FILE_NAME = 'Invoice Template.xlsx'
    WHITELIST = []

4. The API will be available at `http://localhost:3000`.

## API Endpoints

### Get Template File Format
- **Endpoint:** `/api/v1/invoices/template`
- **Method:** GET
- **Description:** To Fetch the Import Customer Books Template

### Import Data
- **Endpoint:** `/api/v1/invoices/upload`
- **Method:** POST
- **Description:** Import Customer Books Template
- **Parameters:** 
  - `customer_data`: The csv | xlsx file in form-data of request body
