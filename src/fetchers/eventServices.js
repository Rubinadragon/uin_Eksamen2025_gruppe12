import { client } from "./client";

export async function fetchAllEvents() {
    const data = await client.fetch(
        `
        *[_type == "event"] {
            _id,
            tittel,
            apiId,
            category        
        }`
    );
    return data;
}