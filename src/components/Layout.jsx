import Header from "./Header";
import "../assets/styles/layout.scss"
import { Link } from "react-router-dom";

export default function Layout({children, selectedClasses}){
    return (
        <>
            <Header selectedClasses={selectedClasses}/>
            <main>
                {children}
            </main>
            <footer><Link to={"https://developer.ticketmaster.com/"}>Discovery API: ©Ticketmaster Developer</Link></footer>
        </>
    )
}
