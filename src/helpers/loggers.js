import fs from 'fs';
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 
 * @returns 
 */
let createFolder = () => {
    let date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`
    let basePath = createBasePath(currentDate);


    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
    }


    return basePath;
}

/**
 * 
 * @param {*} fileName 
 * @param {*} type 
 * @param {*} msg 
 */
let createLogFile = (fileName, type, msg) => {
    let time = new Date().toLocaleTimeString();
    let basePath = createFolder();
    msg = `${time} : ${type} : ${msg})}\n`;
    fs.appendFile(`${basePath}/${fileName}.log`, msg, function (err) {
        if (err) throw err;
    });
}

/**
 * 
 * @param {*} currentDate 
 * @returns 
 */
let createBasePath = (currentDate) => {
    return path.join(__dirname, '../../', 'loggers', `${currentDate}`);
}

/**
 * 
 * @param {*} fileName 
 * @param {*} typeOflog 
 * @param {*} msg 
 */
export const printLog = (fileName, typeOflog, msg) => {
    let type = 'debug'
    typeOflog = typeOflog === undefined ? 0 : typeOflog;
    if (typeOflog === 0) type = 'info';
    else if (typeOflog === 1) type = 'error';
    else type = 'debug';
    createLogFile(fileName, type, msg);
}
