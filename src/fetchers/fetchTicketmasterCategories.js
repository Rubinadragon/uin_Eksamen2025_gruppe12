import { BASE_URL, API_VERSION, API_KEY } from "./ticketmasterAPIBase";

export const fetchSuggestions = async (segmentId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/suggest?apikey=${API_KEY}&locale=*&segmentId=${segmentId}`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded)
    
    return apiresponse;
  }

  export const fetchSuggestionsFilter = async (filter, segmentId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/suggest?apikey=${API_KEY}&latlong=${filter.lat},${filter.long}&locale=*&countryCode=${filter.code}&segmentId=${segmentId}`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded)
    
    return apiresponse;
  }