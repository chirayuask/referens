import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Load environment variables from .env file located two directories up
export default {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  BASE_URL: process.env.BASE_URL,
  FILE_NAME: process.env.FILE_NAME || "Customer-Book-Template.csv",
  TEMPLATE_FILE_PATH: path.join(__dirname, "../../template"),
  FILE_UPLOAD_PATH: path.join(__dirname, "../../uploads"),
  WHITELIST: process.env.WHITELIST || [],
};
