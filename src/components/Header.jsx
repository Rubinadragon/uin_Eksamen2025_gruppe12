import { Link, NavLink } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function Header(){
    return (<header>
                <section className="headerSection">
                    <Link to="/" className="logo">Billettlyst</Link>
                    <nav>
                        <ul>
                            <li>
                            <NavLink to="/category/musikk">Musikk</NavLink>
                            </li>
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