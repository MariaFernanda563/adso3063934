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

const ITEMS_PER_PAGE = 9;

export default function GamesInfo({ games, deleteGame }: GamesInfoProps) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
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

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedGames = filteredGames.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <div>
            <h1>Games</h1>

            <div className="mb-6">
                <input
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                    }}
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
                {paginatedGames.map((game) => (
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
                                <div>
                                    <button
                                        type="button"
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
                                                        value={String(game.id)}
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
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-outline"
                    >
                        Anterior
                    </button>

                    <div className="flex gap-1 items-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`btn btn-sm ${
                                        currentPage === page
                                            ? "btn-active"
                                            : "btn-outline"
                                    }`}
                                >
                                    {page}
                                </button>
                            ),
                        )}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm btn-outline"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
