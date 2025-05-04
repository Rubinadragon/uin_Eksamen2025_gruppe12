const BASE_URL = "https://app.ticketmaster.com/discovery";
const API_VERSION = "v2";
const API_KEY = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";

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

//SegmentID:
//Findings: KZFzniwnSyZfZ7v7nJ
//Neon: KZFzniwnSyZfZ7v7nJ
//Skeikampfestivalen: KZFzniwnSyZfZ7v7nJ
//Tons of Rock: KZFzniwnSyZfZ7v7nJ
//"KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nJ"
const segmentID = "KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nJ"

export const fetchArtistsBySegment = async() =>{
  let apiresponse = null
  await fetch(`${BASE_URL}/${API_VERSION}attractions?apikey=${API_KEY}=*&segmentId=${segmentID}`)
  .then((response) => response.json())
  .then((data) => console.log(data))
}
