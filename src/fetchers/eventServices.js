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
        `*[_type == "event" && apiId == $apiId][0]{
            _id,
            tittel,
            apiId,
            category
            }`,{apiId})
    return data
}

//FetchUserByWishList
export async function fetchUserByWishList(wishlisted){
    const data = await client.fetch(
        `*[_type == "event" && apiId == $wishlisted]{
            _id,
            tittel,
            apiId,
            "wishlisted": *[_type=="bruker" && ^._id in wishlist[]._ref]{
                _id,
                name,
                image
            }
        }`, {wishlisted}
    )
    return data
}