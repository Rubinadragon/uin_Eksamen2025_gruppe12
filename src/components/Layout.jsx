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
            <Header 
            selectedClasses={selectedClasses} 
            setSelectedClasses={setSelectedClasses} 
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            logout={logout}
            />
              
            <main>
                {children}
            </main>
            <footer>
                <Link to={"https://github.com/Rubinadragon?tab=repositories"}>GitHub Repository</Link>
                <Link to={"https://developer.ticketmaster.com/"}>Discovery API: ©Ticketmaster Developer</Link>
            </footer>
        </>
    );
}
