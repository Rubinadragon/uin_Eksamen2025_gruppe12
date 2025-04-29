import Header from "./Header";

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