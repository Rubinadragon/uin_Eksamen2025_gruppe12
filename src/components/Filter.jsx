import { useState } from "react"; 
import { countries } from "../assets/js/countryCodes";
import { cities } from "../assets/js/citiesLocation";
import "../assets/styles/filter.scss";

export default function Filter({setLoadingResults, setFilterQuery}) {

    const [filterCountry, setFilterCountry] = useState("");

    const handleChange = (value) => {
        setFilterCountry(value)
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingResults(true)

        let buildFilter = "";
        
        const _target = e?.target;
        if (!_target)
          return "";
  
        if(_target.filterSearch?.value?.length)
          buildFilter += "&keyword=" + e.target.filterSearch.value;
        if(_target.filterCountries?.value?.length)
          buildFilter += "&countryCode=" + e.target.filterCountries.value;
        if(_target.filterCities?.value?.length)
          buildFilter += "&geoPoint=" + e.target.filterCities.value;
        if(_target.filterDates?.value?.length)
          buildFilter += "&localStartEndDateTime=" + e.target.filterDates.value + "T00:00:00";
        
        setFilterQuery(buildFilter)
      }

    return(
        <article className="filterLayout">
            <form onSubmit={handleSubmit}>
              <label htmlFor="filterDates">
                <span>Dato</span>
                <input type="date" id="filterDates" name="dates" />
              </label>
              
              <label htmlFor="filterCountries">
                <span>Land</span>
                <select name="countries" id="filterCountries" onChange={(e)=> handleChange(e.target.value)}>
                  <option value="" disabled selected hidden>Norge</option>
                {
                    countries.map((country) => (
                    <option key={`select_${country.code}`}value={country.code}>{country.name}</option>
                    ))
                }
                </select>
                </label>
              <label htmlFor="filterCities">
                <span>By</span>
                <select name="cities" id="filterCities">
                  <option value="" disabled selected hidden>Ingen by valgt</option>
                    {
                    cities.filter((city) => city.code === filterCountry).map((city) =>(
                        <option key={`city_${city.name}`} value={city.lat + "," + city.long}>{city.name}</option>
                    ))
                    }
                </select>
              </label>
              <button type="submit">Filtrer</button>
            </form>

            <form onSubmit={handleSubmit}>
                <label htmlFor="filterSearch">
                  <span>Søk på arrangement</span>
                  <input type="text" id="filterSearch" name="search" />
                </label>
                <button type="submit">Søk</button>
            </form>
        </article>
    )
}