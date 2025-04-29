import { Link, NavLink } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function Header({selectedClasses, setSelectedClasses}){
    //Get classification details
    //segment, _embedded,
    //Musikk: KZFzniwnSyZfZ7v7nJ
    //Sport: KZFzniwnSyZfZ7v7nE
    //Fant ikke noe som het teater/show, men isteden fant jeg Arts & Theatre: KZFzniwnSyZfZ7v7na
    //locale: no
    return (<header>
                <section className="headerSection">
                    <Link to="/" className="logo">Billettlyst</Link>
                    <nav>
                        <ul>
                            {selectedClasses?.map((classification) => (
                                <li key={classification.segment.id}>
                                <NavLink to={`category/${classification.segment.id}`}>{classification.segment.name}
                                </NavLink>
                                </li>))}
                            <li>
                            <NavLink to="/category/sport">Sport</NavLink>
                            </li>
                            <li>
                            <NavLink to="/category/teater">Teater</NavLink>
                            </li>                            
                            <li>
                                <LinkButton/>
                            </li>
                        </ul>
                    </nav>
                </section>
            </header>)
}