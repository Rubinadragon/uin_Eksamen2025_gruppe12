import { client } from "./client";

export async function fetchSanityEvents(){
    const data = await client.fetch(
        `*[_type == "event"]
        {_id,
        tittel,
        apiId,
        category}`
    )
    return data
}

export async function fetchSingleSanityEvent(apiId){
    const data = await client.fetch(
        `*[_type == "event" && apiId == $apiId]{
            _id,
            tittel,
            apiId,
            category
            }`,{apiId})
    return data
}