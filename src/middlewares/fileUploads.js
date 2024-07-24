import multer from "multer";
import env from "../config/env.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, env.FILE_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let mime = file.originalname.split(".")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + mime);
  },
});

export const upload = multer({ storage: storage, limits: '2mb' });
