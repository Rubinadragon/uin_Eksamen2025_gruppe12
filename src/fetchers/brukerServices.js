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
                apiID
            },
            "previousPurchases": previousPurchases[]->{
                _id,
                apiID
            }
            }`,
            {username}
    );
    return data;
}

export async function fetchUsersByWishList(wishlisted){
    const data = await client.fetch(`*[_type == "bruker" && apiID == $wishlisted]{
            _id,
            name,
            image {asset->{url}, alt},
            "wishlist": wishlist[]->{
                _id,
                apiID
            },
            }`,{wishlisted})
    return data
}

export async function fetchWishList(){
    const data = await client.fetch(
        `*[_type == "bruker"]{_id,name,wishlist}`
    )
    return data
    
}