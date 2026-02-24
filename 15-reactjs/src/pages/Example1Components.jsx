import BtnBack from "../components/BtnBack";

//Component
function Charmander() {
    return (
        <div
            style={{
                border: "4px solid orange",
                padding: "1.4rem",
                color: "#000",
                borderRadius: "0.3rem",
                background: "#fff0e6",
                width: "360px",
            }}
        >
            <h2>Charmander 🔥</h2>
            <p>Type: Fire</p>
            <p>Ability: Blaze</p>
        </div>
    );
}

function Bulbasaur() {
    return (
        <div
            style={{
                border: "4px solid green",
                padding: "1.4rem",
                color: "#000",
                borderRadius: "0.3rem",
                background: "#fff0e6",
                width: "360px",
            }}
        >
            <h2>Bulbasaur 🌿</h2>
            <p>Type: Grass</p>
            <p>Ability: Overgrow</p>
        </div>
    );
}

function ExampleComponents() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 1: Components</h2>
            <p>Create Independent a reusable UI places</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.4rem', gap: '1rem'}}>
                <Charmander />
                <Bulbasaur />
            </div>
        </div>
    );
}

export default ExampleComponents;
