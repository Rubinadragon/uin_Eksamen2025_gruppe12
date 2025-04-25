import LinkButton from "./LinkButton";

export default function Header(){
    return (<header>
                <section>
                    <a className="logo">Billettlyst</a>
                    <nav>
                        <ul>
                            <li>
                                <a>Kategori</a>
                            </li>
                            <li>
                                <LinkButton/>
                            </li>
                        </ul>
                    </nav>
                </section>
            </header>)
}