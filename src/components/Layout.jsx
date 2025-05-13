import Header from "./Header";
import "../assets/styles/layout.scss"
import { Link } from "react-router-dom";

export default function Layout({children, selectedClasses, setSelectedClasses}){
    return (
        <>
            <Header selectedClasses={selectedClasses} setSelectedClasses={setSelectedClasses}/>
            <main>
                {children}
            </main>
            <footer><Link to={"https://developer.ticketmaster.com/"}>Discovery API: ©Ticketmaster Developer</Link></footer>
        </>
    )
}
