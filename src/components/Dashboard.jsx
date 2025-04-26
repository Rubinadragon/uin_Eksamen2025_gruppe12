export default function Dashboard(){
    return (
    <>
    <h2>Logg inn</h2>
    <section>
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