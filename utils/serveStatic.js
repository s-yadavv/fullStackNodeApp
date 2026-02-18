import path from 'node:path';
import fs from 'node:fs/promises';
import { sendResponse } from './sendResponse.js';
import { getContentType } from './getContentType.js';

export async function serveStatic(req,res,dir){
    const publicDir = path.join(dir,'public');
    const filePath = path.join(publicDir,
        req.url === '/' ? 'index.html': req.url);
    
    const ext = path.extname(filePath);
    const contentType = getContentType(ext);
    try{
    const content = await fs.readFile(filePath)
    sendResponse(res,200,contentType,content);
    //console.log(filePath);
    }catch(er){
        //console.log(er.code);
        if(er.code == 'ENOENT'){
            const errcontent  = await fs.readFile(path.join(publicDir,'404.html'));
            sendResponse(res,404,'text/html',errcontent);
        }else{
            sendResponse(res, 500, 'text/html', '<html><h1>SERVER ERROR!! </h1></html>')
        }
    }


}
