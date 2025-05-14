import { Link, NavLink } from "react-router-dom";
import "../assets/styles/header.scss"

import LinkButton from "./LinkButton";

export default function Header({selectedClasses}){
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
                                <li key={classification.id} className="classLink">
                                <NavLink to={`category/${classification.id}`}>{classification.name}
                                </NavLink>
                                </li>))}                                                        
                            <li>
                                <LinkButton/>
                            </li>
                            
                        </ul>
                    </nav>
                </section>
            </header>)
}
