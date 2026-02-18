export function sendResponse(res,status,contentTpe,payLoad){
    res.statuscode = status;
    res.setHeader('Content-Type',contentTpe);
    res.end(payLoad);
}