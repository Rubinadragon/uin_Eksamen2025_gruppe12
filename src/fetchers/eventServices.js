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
        `*[_type == "event" && name == $apiId][0]{
            _id,
            tittel,
            apiId,
            category
            }`,{apiId})
    return data
}
/*
*[_type == "bruker" && name == $username][0]{
            _id,
            name,
            gender,
            age,
            email,
            image {asset->{url}, alt},
            "wishlist": wishlist[]->{
                _id,
                apiID
            },
            "previousPurchases": previousPurchases[]->{
                _id,
                apiID
            }
            }
            */