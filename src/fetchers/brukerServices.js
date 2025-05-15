import { client } from "./client";

export async function fetchUserName(username) {
    const data = await client.fetch(
        `*[_type == "bruker" && name == $username][0]{
            _id,
            name,
            gender,
            age,
            email,
            image {asset->{url}, alt},
            "wishlist": wishlist[]->{
                _id,
                tittel,
                apiId,
                category
            },
            "previousPurchases": previousPurchases[]->{
                _id,
                tittel,
                apiId,
                category
            }
            }`,
            {username}
    );
    return data;
}

export async function fetchAllUsers() {
    const data = await client.fetch(
        `*[_type == "bruker"] {
            _id,
            name,
            email,
            age,
            image {asset -> {url}, alt},
            "wishlist": wishlist[]-> {
                _id,
                tittel,
                apiId},
            previousPurchases[]-> {
                _id, 
                tittel, 
                apiId}
        }`
    );
    return data;

export async function fetchWishList(){
    const data = await client.fetch(
        `*[_type == "bruker"]{_id,name,wishlist}`
    )
    return data
    
}