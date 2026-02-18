import sanitizeHtml from 'sanitize-html'

export function sanitizeInput(data) {
    const sanitizedData = {};

    for (const [key,value] of Object.entries(data)){ // prevents cross-site scripting attacts
        if(typeof value === 'string'){
            sanitizedData[key] = sanitizeHtml(value,{allowedTags:['b','button'], allowedAttributes:{}});
        }else{
            sanitizedData[key] = value;
        }
    }
    return sanitizedData;
}