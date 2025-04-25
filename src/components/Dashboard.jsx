export default function Dashboard(){
    return (
    <>
    <h2>Logg inn</h2>
    <section>
        <form>
            <label for="usernameInput">Brukernavn</label>
            <input type="text" id="usernameInput"></input>
            <label for="passwordInput">Passord</label>
            <input type="text" id="passwordInput"></input>
            <button>Logg inn</button>
        </form>
    </section>
    </>)
}