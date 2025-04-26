import { Link } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function Header(){
    return (<header>
                <section>
                    <Link to="/" className="logo">Billettlyst</Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to="#">Kategori</Link>
                            </li>
                            <li>
                                <LinkButton/>
                            </li>
                        </ul>
                    </nav>
                </section>
            </header>)
}