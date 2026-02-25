import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Random() {
    return (
        <div className="random-pokemon">
            <button onClick={() => alert("¡Pokemon atrapado!")}>Atrapar Pokemon</button>
        </div>
    );
}

function Example4StateHooks() {
    //Data
    const pokemons = [
        {
            id: 1,
            name: "Pikachu",
            type: "Electric",
            power: "Thunderbold",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
            legendary: false,
        },
        {
            id: 2,
            name: "Charizard",
            type: "Fire",
            power: "Flamethrower",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
            legendary: false,
        },
        {
            id: 3,
            name: "Mewtwo",
            type: "Psychic",
            power: "Psychic",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
            legendary: true,
        },
        {
            id: 4,
            name: "Gyarados",
            type: "Water/Flying",
            power: "Hydro Pump",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
            legendary: false,
        },
        {
            id: 5,
            name: "Bulbasaur",
            type: "Grass/Poison",
            power: "Vine Whip",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            legendary: false,
        },
        {
            id: 6,
            name: "Dragonite",
            type: "Dragon/Flying",
            power: "Dragon Pulse",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
            legendary: false,
        },
        {
            id: 7,
            name: "Lugia",
            type: "Psychic/Flying",
            power: "Psychic",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png",
            legendary: true,
        },
        {
            id: 8,
            name: "Eevee",
            type: "Normal",
            power: "Quick Attack",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
            legendary: false,
        }
            
    ];

    //Styles
    const styles = {
        cards: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        },
    };
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function argments).</p>
            <div style={styles.cards}>
                {/* We pass different props to each card */}
                {pokemons.map((pokemon) => (
                    <CardPokemon
                        key={pokemon.id}
                        name={pokemon.name}
                        type={pokemon.type}
                        power={pokemon.power}
                        image={pokemon.image}
                        legendary={pokemon.legendary}
                    />
                ))}
            </div>
            <Random />
        </div>
    );
}

export default Example4StateHooks;
