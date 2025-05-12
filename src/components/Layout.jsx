import Header from "./Header";
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
        </>
    );
}
