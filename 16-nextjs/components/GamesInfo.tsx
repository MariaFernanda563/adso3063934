"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type GameWithConsole = {
    id: number | string;
    title: string;
    cover: string;
    console: {
        name: string;
    };
};

type GamesInfoProps = {
    games: GameWithConsole[];
    deleteGame: (formData: FormData) => Promise<void>;
};

export default function GamesInfo({ games, deleteGame }: GamesInfoProps) {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const addGame = () => {
        router.push("/games/add");
    };

    const filteredGames = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return games;

        return games.filter((game) => {
            return (
                game.title.toLowerCase().includes(term) ||
                game.console.name.toLowerCase().includes(term)
            );
        });
    }, [games, search]);

    return (
        <div>
            <h1>Games</h1>

            <div className="mb-6">
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar juego o consola..."
                    className="input input-bordered w-full max-w-lg"
                />
                <button
                    onClick={addGame}
                    className="btn btn-soft btn-success mb-4 ml-190 mt-3"
                >
                    Add Game
                </button>
            </div>

            <p className="mb-4 text-sm text-gray-300">
                Resultados: {filteredGames.length}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {filteredGames.map((game) => (
                    <div
                        key={game.id}
                        className="card card-compact bg-black shadow-sm h-full"
                    >
                        <figure className="relative w-full h-48">
                            <Image
                                src={`/img/${game.cover}`}
                                alt={game.title}
                                fill
                                className="object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{game.title}</h2>
                            <p>Console: {game.console.name}</p>
                            <div className="flex gap-2 mt-4 justify-end">
                                <a
                                    href={`/games/${game.id}`}
                                    className="btn btn-soft btn-primary w-20"
                                >
                                    View
                                </a>
                                <a
                                    href={`/games/${game.id}/edit`}
                                    className="btn btn-soft btn-warning w-20"
                                >
                                    Edit
                                </a>
                                <form action={deleteGame}>
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={game.id}
                                    />

                                    <>
                                        <button
                                            className="btn btn-soft btn-error w-20"
                                            onClick={() =>
                                                (
                                                    document.getElementById(
                                                        `delete_modal_${game.id}`,
                                                    ) as HTMLDialogElement
                                                ).showModal()
                                            }
                                        >
                                            Delete
                                        </button>

                                        <dialog
                                            id={`delete_modal_${game.id}`}
                                            className="modal modal-bottom sm:modal-middle"
                                        >
                                            <div className="modal-box bg-black">
                                                <h3 className="font-bold text-lg">
                                                    Alert!
                                                </h3>

                                                <p className="py-4">
                                                    Are you sure you want to
                                                    delete this game?
                                                </p>

                                                <div className="modal-action">
                                                    <form
                                                        action={deleteGame}
                                                        className="flex gap-2"
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="id"
                                                            value={game.id}
                                                        />

                                                        <button
                                                            type="submit"
                                                            className="btn btn-soft btn-error"
                                                        >
                                                            Confirm
                                                        </button>
                                                    </form>

                                                    <form method="dialog">
                                                        <button className="btn">
                                                            Cancel
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
