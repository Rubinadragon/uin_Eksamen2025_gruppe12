import { loadEventImg, formatDateNO } from "../assets/js/utils"
import "../assets/styles/eventHeader.scss"

export default function EventHeader({attraction, dates, location}) {

    return (
        <section className="eventHeader">
            {location && <p>{location.name}, {location.city.name}</p> }
            {dates && <p>{formatDateNO(dates[0])} - {formatDateNO(dates.slice(-1)[0])}</p> }
            <h1>{attraction.name}</h1>
            <img src={loadEventImg(attraction, 1200, 2048)} alt=""/>
            <div className="bgDarkOverlay"></div>
        </section>
    )
}