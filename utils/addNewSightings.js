import fs from 'node:fs/promises';
import { getData } from './getData.js';
import path from 'node:path';


export async function addNewSightings(newSightings){

    try{
        const sightings = await getData();
        sightings.push(newSightings);
        const pathJSON = path.join('data','data.json');
        fs.writeFile(
            pathJSON,
            JSON.stringify(sightings,null,2),
            'utf-8'
        )
    }catch(er){
        throw new Error(er);
    }
}