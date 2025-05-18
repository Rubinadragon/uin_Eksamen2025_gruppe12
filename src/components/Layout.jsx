import Header from "./Header";
import { Link } from "react-router-dom";
import "../assets/styles/layout.scss";

export default function Layout({
    children, 
    selectedClasses, 
    setSelectedClasses, 
    isLoggedIn,
    currentUser,
    logout  
}) {
    
  return (
        <>
            <a href="#main" class="skip-link">Gå til hovedinnhold</a>
            <Header 
            selectedClasses={selectedClasses} 
            setSelectedClasses={setSelectedClasses} 
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            logout={logout}
            />
              
            <main id="main">
                {children}
            </main>
            <footer>
                <Link to={"https://github.com/Rubinadragon/uin_Eksamen2025_gruppe12"}>GitHub Repository</Link>
                <Link to={"https://developer.ticketmaster.com/"}>Discovery API: ©Ticketmaster Developer</Link>
            </footer>
        </>
    );
}
