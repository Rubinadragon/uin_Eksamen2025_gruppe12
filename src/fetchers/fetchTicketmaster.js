const BASE_URL = "https://app.ticketmaster.com/discovery";
const API_VERSION = "v2";
const API_KEY = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";

// Fetches attractions based on ID
// String Ids separated with comma
export const fetchAttractionsById = async (attracionsId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions?apikey=${API_KEY}&id=${attracionsId}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded.attractions);
    return apiresponse;
}


export const fetchAttractionById = async (attracionId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions/${attracionId}?apikey=${API_KEY}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data);
    return apiresponse;
}

