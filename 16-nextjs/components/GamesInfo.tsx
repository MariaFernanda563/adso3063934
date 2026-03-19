import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

export default async function GamesInfo() {
    const games = await prisma.game.findMany({
        include: { console: true },
    });

    return (
        <div>
            <h1>Games</h1>

            {games.map((game) => (
                <div
                    key={game.id}
                    className="bg-black/80 flex mb-2 p-4 rounded"
                >
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src="/img/gwr.jpg" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2 p-4 rounded">
                        <h2 className="text-lg">{game.title}</h2>
                        <p className="text-sm text-gray-500">{game.developer}</p>
                    </div>
                    <div className="badge badge-soft badge-secondary mt-7">
                        {game.console.name}
                    </div>
                    <div className="badge badge-soft badge-info">
                        {game.genre}
                    </div>
                    <p>{game.price}</p>
                    <p>{game.releaseDate.toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}
