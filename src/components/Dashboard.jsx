export default function Dashboard(){
    return (
    <>
    <h1>Logg inn</h1>
    <section id="dashboardLoggedOut" className="dashboard">
        <form>
            <label htmlFor="usernameInput">Brukernavn</label>
            <input type="text" id="usernameInput"></input>
            <label htmlFor="passwordInput">Passord</label>
            <input type="text" id="passwordInput"></input>
            <button>Logg inn</button>
        </form>
    </section>
    </>)
}