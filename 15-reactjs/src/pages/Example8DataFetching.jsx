import React, { useEffect, useState } from "react";
import BtnBack from "../components/BtnBack";

function Example8DataFetching() {

    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await response.json();

        const pokemonWithId = data.results.map((pokemon, index) => ({
            ...pokemon,
            id: index + 1
        }));

        setPokemons(pokemonWithId);
    };

    const fetchPokemonDetail = async (url) => {
    try {
        setLoading(true);
        setSelectedPokemon(null); // limpiamos antes

        const response = await fetch(url);
        const data = await response.json();

        setSelectedPokemon(data);
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
};

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 8: Data Fetching</h2>
            <p>Connect with external APIs to get real data</p>

            <input
                type="text"
                placeholder="Search pokemon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "10px", marginBottom: "20px" }}
            />

            {/* 🔥 Cards */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center"
            }}>
                {filteredPokemons.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        onClick={() => fetchPokemonDetail(pokemon.url)}
                        style={{
                            width: "160px",
                            padding: "15px",
                            borderRadius: "15px",
                            background: "#0000",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                            transition: "0.3s"
                        }}
                    >
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            alt={pokemon.name}
                            width="100"
                        />
                        <h4>{pokemon.name.toUpperCase()}</h4>
                    </div>
                ))}
            </div>

            {/* 🔥 MODAL */}
            {selectedPokemon && (
                <div
                    onClick={() => setSelectedPokemon(null)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#000",
                            padding: "30px",
                            borderRadius: "20px",
                            width: "400px",
                            textAlign: "center",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                        }}
                    >
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <h2>{selectedPokemon.name.toUpperCase()}</h2>

                                <img
                                    src={selectedPokemon.sprites.other["official-artwork"].front_default}
                                    alt={selectedPokemon.name}
                                    width="200"
                                />

                                <p><strong>ID:</strong> {selectedPokemon.id}</p>
                                <p><strong>Height:</strong> {selectedPokemon.height}</p>
                                <p><strong>Weight:</strong> {selectedPokemon.weight}</p>
                                <p><strong>Base Exp:</strong> {selectedPokemon.base_experience}</p>

                                <h4>Types</h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {selectedPokemon.types.map((type, index) => (
                                        <li key={index}>{type.type.name}</li>
                                    ))}
                                </ul>

                                <h4>Abilities</h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {selectedPokemon.abilities.map((ability, index) => (
                                        <li key={index}>{ability.ability.name}</li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => setSelectedPokemon(null)}
                                    style={{
                                        marginTop: "15px",
                                        padding: "8px 15px",
                                        borderRadius: "8px",
                                        border: "none",
                                        background: "#ff4d4d",
                                        color: "white",
                                        cursor: "pointer"
                                    }}
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Example8DataFetching;