import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { addNewSightings } from "../utils/addNewSightings.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sightingEvents } from "../events/sightingEvents.js";
import { stories } from "../data/stories.js";

export async function handleGet(res){
    const data = await getData();
    //console.log(data);
    sendResponse(res, 200, 'application/json', JSON.stringify(data));
}

export async function handlePost(req,res){

    try{
        const parsedBody = await parseJSONBody(req);
        const sanitizedData = sanitizeInput(parsedBody);
        //console.log(parsedBody);
        await addNewSightings(sanitizedData);
        sightingEvents.emit('sighting-added',sanitizedData);

        sendResponse(res,201, 'application/json',JSON.stringify(sanitizedData));

    }catch(er){
        sendResponse(res,400, 'application/json', JSON.stringify({Error : er}))
    }
    //console.log(parsedBody);
    console.log("Recieved!");
}

export async function handleNews(req,res) {
    res.statusCode = 200;
    res.setHeader("Content-Type","text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive");


    setInterval( () =>{
        let randomIndex = Math.floor(Math.random() * stories.length);

            res.write(
            `data: ${JSON.stringify({
             event: 'news-update',
             story: stories[randomIndex]
            })}\n\n`
        )

    },3000)
}