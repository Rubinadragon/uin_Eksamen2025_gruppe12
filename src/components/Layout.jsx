import Header from "./Header";
import "../assets/styles/layout.scss"

export default function Layout({children, selectedClasses}){
    return (
        <>
            <Header selectedClasses={selectedClasses}/>
            <main>
                {children}
            </main>
        </>
    )
}
