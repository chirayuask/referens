import { Router } from "express";
import {
  getInvoicesTemplate,
  generateInvoiceUpload
} from "../controller/invoices.js";
import { upload } from "../middlewares/fileUploads.js";
import { validateData } from "../middlewares/validators/invoices.js";

const routes = Router();

// Route to fetch the Invoice template
routes.get("/template", getInvoicesTemplate);

// Route to upload Invoices Data
routes.post(
  "/upload",
  upload.single("invoices"),
  validateData,
  generateInvoiceUpload
);

export default routes;
