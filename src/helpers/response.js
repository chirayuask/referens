import { printLog } from "./loggers.js";

export const responses = (data) => {
    return {
        200: {
            statuscode: 200,
            statusmessage: "OK",
            data
        },
        203: {
            statuscode: 203,
            statusmessage: "Non-Authoritative Information",
            data
        },
        301: {
            statuscode: 301,
            statusmessage: "Moved Permanently",
            data
        },
        400: {
            statuscode: 400,
            statusmessage: "Bad Request",
            data
        },
        404: {
            statuscode: 404,
            statusmessage: "Not Found",
            data
        },
        409: {
            statuscode: 409,
            statusmessage: "Conflict",
            data
        },
        422: {
            statuscode: 422,
            statusmessage: "Unprocessable Entity",
            data
        },
        500: {
            statuscode: 500,
            statusmessage: "Internal Server Error",
            error: data
        }
    };
}


export const sendReponse = (res, data) => {
    let generateResponse = responses(data?.response || null);
    if(data?.code === 500) printLog('errorlog', 1, data?.response)
    return res.status(data?.code || 400).send(generateResponse[data?.code || 400]);
}