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


// Fetcher attraksjoner basert på slug (fungerer kun ved bruk av engelsk nøkkel ord, kan byttes ut til en mer dynamisk metode)
export const fetchEventsByCategory = async (categorySlug) => {
    try {
        const response = await fetch(
            `${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&classificationName=${categorySlug}&locale=*`
        );
        const data = await response.json();
        return data._embedded?.events || [];
    } catch (error) {
        console.error("Kunne ikke finne event gjennom kategori", error);
        return [];
    }
};

