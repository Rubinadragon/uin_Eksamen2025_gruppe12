import Header from "./Header";
import "../assets/styles/layout.scss"

export default function Layout({children, selectedClasses, setSelectedClasses}){
    return (
        <>
            <Header selectedClasses={selectedClasses} setSelectedClasses={setSelectedClasses}/>
            <main>
                {children}
            </main>
        </>
    )
}