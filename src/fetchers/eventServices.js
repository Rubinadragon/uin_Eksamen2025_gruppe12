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
export async function FetchUserByWishList(wishlisted){
    const data = await client.fetch(
        `*[_type == "event" /&& apiId == $wishlisted{
            _id,
            tittel,
            apiId,
            "wishlisted":*[_type=='bruker' && ^._id in wishlist[]._ref]{
                _id,
                name,
            }
        }`, {apiId}
    )
}

/*export async function fetchPerson(personSlug) {
    const data = await client.fetch(
        `*[personslug.current == $personSlug] | {
        _id,
        _createdAt,
        profilbilde {asset->{url}, alt},
        personnavn,
        epost,
        bio,
        interesser,
        "personslug": personslug.current,
        "personlogg": *[_type=='logg' && references(^._id)]{
          _id,
          _createdAt,
          loggdato,
          loggpersoner[]-> {
            personnavn
          },
          loggbeskrivelse,
          loggtimer,
        } | order(loggdato asc, _createdAt asc)
    }`, {personSlug}
    );
    return data[0];
}*/