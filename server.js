import http from 'node:http';
import { serveStatic } from './utils/serveStatic.js';
import fs from 'node:fs/promises';
import { getData } from './utils/getData.js';
import { handleGet, handleNews, handlePost  } from './handlers/routeHandlers.js';

//import { getContentType } from './utils/getContentType.js';
//import { sendResponse } from './utils/sendResponse.js';

const PORT  = 8000;

const __dirname = import.meta.dirname;

//console.log(await getData());

const server = http.createServer(async (req, res) =>{

    if(req.url === '/api'){
        if(req.method === 'GET'){
            return await handleGet(res);
        }else if(req.method === 'POST'){
            handlePost(req,res,__dirname);
        }
    }else if(req.url === '/api/news'){
        return await handleNews(req,res);
        
    }else if(!req.url.startsWith('/api')){
        return await serveStatic(req,res,__dirname);
    }
    
} )

server.listen(PORT, ()=>console.log("Connected!"));