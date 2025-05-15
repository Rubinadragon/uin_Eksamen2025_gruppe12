export const BASE_URL = "https://app.ticketmaster.com/discovery";
export const API_VERSION = "v2";
export const API_KEY = "JF1iWmRvlI6x3AbIps1uDqKtG9njUcTx";
//export const API_KEY = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";

// Fetches multiple classifications based on IDS
// param: String Ids separated with comma (in same string)
export const fetchSelectedClassifications = async (classificationIDs) => {
  let apiresponse = null;

  await fetch(`${BASE_URL}/${API_VERSION}/classifications?apikey=${API_KEY}&id=${classificationIDs}&locale=no`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded.classifications)
  return apiresponse || [];
}


// Fetches attractions based on ID
// param: String Ids separated with comma (in same string)
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

  // fetches single events by id
  // param: string id
  export const fetchSingleEventsById = async (eventId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/events/${eventId}?apikey=${API_KEY}&locale=*`)
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

  export const fetchEventSearchInfo = async (attracionId) => {
    let apiresponse = null
    await fetch(`${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&attractionId=${attracionId}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded.events)

    return apiresponse
  }


  // Fetcher enkelt event med ID
  // param: string eventId
  export const fetchSingleEventById = async (eventId) => {
    if (!eventId) {
      console.error("Mangler eventId");
      return null;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/${API_VERSION}/events/${eventId}.json?apikey=${API_KEY}&locale=*`
      );

      if (!response.ok) {
        console.error(`Feil ved henting av event ${eventId}`);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Feil ved henting av enkelt event:", error);
      return null;
    }
};


//${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&attractionId=${attracionId}&locale=*
//https://app.ticketmaster.com/discovery/v2/events?apikey=sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX&attractionId=K8vZ917oWOV,K8vZ917K7fV,K8vZ917bJC7,K8vZ917_YJf&locale=*

