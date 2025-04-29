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
                            {/*setSelectedClasses.map?((class) => (<li key={class.id}>

                            </li>))*/}
                            <li>
                                <NavLink to={`category/:slug`}>Kategori</NavLink>
                            </li>
                            <li>
                                <LinkButton/>
                            </li>
                        </ul>
                    </nav>
                </section>
            </header>)
}