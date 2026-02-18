import path from 'node:path'
import fs from 'node:fs/promises'

export async function getData() {
    try{
        const pathJSON = path.join('data','data.json');
        const data = await fs.readFile(pathJSON,'utf-8');
        const parsedData = JSON.parse(data);
        return parsedData;
    }catch(er){
        console.log(er);
        return [];
    }
    return "getdata()";
}