export const BASE_URL = "https://app.ticketmaster.com/discovery";
export const API_VERSION = "v2";
export const API_KEY = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";

// Fetches attractions based on ID
// param: String Ids separated with comma
export const fetchAttractionsById = async (attractionsId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions?apikey=${API_KEY}&id=${attractionsId}&locale=*`)
      .then((response) => response.json())
      .then((data) => apiresponse = data._embedded?.attractions); 
    return apiresponse || []; 
  };

  // fetched single attraction by id
  // param: string id
  export const fetchSingleAttractionById = async (attracionId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions/${attracionId}?apikey=${API_KEY}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data);
    return apiresponse;
}
  
  export const fetchEventsByCategory = async (classificationId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&classificationId=${classificationId}&locale=*`
      );
      const data = await response.json();
      return data._embedded?.events || [];
    } catch (error) {
      console.error("Kunne ikke finne events med ID:", error);
      return [];
    }
  };

  // Fetches attractions, events and venues from suggest endpoint
  // param: string of parameters such as segmentId, countryCode, geoPoint, keyword
  export const fetchSuggestions = async (catFilter) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/suggest?apikey=${API_KEY}&locale=*${catFilter}&resource=events,venues`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded)
    
    return apiresponse;
  }
