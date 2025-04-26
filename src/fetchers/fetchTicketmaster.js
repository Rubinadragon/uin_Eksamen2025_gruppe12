const BASE_URL = "https://app.ticketmaster.com/discovery";
const API_VERSION = "v2";
const API_KEY = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";

// Fetches multiple attractions based on ID
export const fetchSelectedFestivals = async () => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions?apikey=${API_KEY}&id=K8vZ917oWOV,K8vZ917K7fV,K8vZ917bJC7,K8vZ917_YJf&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded.attractions);
    return apiresponse;
}


