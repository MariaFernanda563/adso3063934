import { Routes, Route, Link, useLocation } from "react-router-dom";
import BtnBack from "../components/BtnBack";

function GeneralInfo() {
    return (
        <div>
            <h2>General Info</h2>
            <p>
                Pokémon es una exitosa franquicia japonesa creada por Satoshi
                Tajiri en 1996, basada en la colección, entrenamiento y combate
                de criaturas fantásticas ("monstruos de bolsillo"). Con más de
                1000 especies, la saga principal de videojuegos, anime y cartas
                busca convertir a los entrenadores en campeones
            </p>
        </div>
    );
}

const pokemones = [
    {
        id: 25,
        nombre: "Pikachu",
        imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
    {
        id: 4,
        nombre: "Charmander",
        imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    },
];

function PokemonList() {
    return (
        <div>
            <h2>Pokemon List</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {pokemones.map((pokemon) => (
                    <li key={pokemon.id} style={{ marginBottom: "20px" }}>
                        <a
                            href={pokemon.imagen}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={pokemon.imagen}
                                alt={pokemon.nombre}
                                style={{ width: "150px" }}
                            />
                        </a>
                        <p>{pokemon.nombre}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PokemonDetails(){
    const location = useLocation();
    const name = new URLSearchParams(location.search).get('name');
    const images = {
        Pikachu: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        Charmander: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    };
    const img = name ? images[name] : null;

    return(
        <div style={{ textAlign: 'center', padding: '20px', maxWidth: '500px', margin: '0 auto', background: '#f5f5f5', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <h2>Detalles del Pokémon</h2>
            <p><strong>Seleccionado:</strong> {name || '—'}</p>
            {img ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <img src={img} alt={name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '2px solid #ddd', maxHeight: '300px' }} />
                </div>
            ) : (
                name && <p>No hay imagen disponible para {name}.</p>
            )}
        </div>
    )
}

function InternalNavigation() {
    return (
        <nav>
            <Link to="/example7">🏠 Home</Link>
            <Link to="/example7/list">✅ Lista</Link>
            <Link to="/example7/details?name=Pikachu">⚡ Pikachu</Link>
            <Link to="/example7/details?name=Charmander">🔥 Charmander</Link>
        </nav>
    );
}

function Example7Routing() {
    const location = useLocation();
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 7: React Router</h2>
            <p>
                Navigation betweem different 'pages' without reloading the
                browser .
            </p>
            <InternalNavigation />
            {/* Absolute Path */}
            <Routes>
                <Route path="/" element={<GeneralInfo />}></Route>
                <Route path="/list" element={<PokemonList />}></Route>
                <Route path="/details" element={<PokemonDetails />}></Route>
            </Routes>
        </div>
    );
}

export default Example7Routing;
