import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { notFound } from "next/navigation";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const consoleItem = await prisma.console.findUnique({
        where: { id: Number(id) },
    });

    if (!consoleItem) return notFound();

    return (
        <div className="min-h-screen flex justify-center items-center from-black to-purple-950 text-white">
            <div className="bg-black/80 border border-purple-500/30 p-8 rounded-2xl w-full max-w-3xl shadow-xl flex flex-col gap-6">

                {/* BOTON BACK */}
                <a href="/consoles">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#C27AFF"
                        viewBox="0 0 256 256"
                    >
                        <path d="M232,184a8,8,0,0,1-16,0A88,88,0,0,0,65.78,121.78L43.4,144H88a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V88a8,8,0,0,1,16,0v44.77l22.48-22.33A104,104,0,0,1,232,184Z"></path>
                    </svg>
                </a>

                {/* TITULO */}
                <h1 className="text-3xl text-purple-400 text-center">
                    {consoleItem.name}
                </h1>

                {/* IMAGEN */}
                <div className="flex justify-center">
                    <div className="w-56 h-56 rounded-xl overflow-hidden border border-purple-500">
                        <img
                            src={`/img/${consoleItem.image || "no-image.png"}`}
                            alt={consoleItem.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* INFO */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>
                        <span className="text-purple-400">Manufacturer:</span>
                        <br />
                        {consoleItem.manuFacturer}
                    </p>

                    <p>
                        <span className="text-purple-400">Release Date:</span>
                        <br />
                        {new Date(consoleItem.releaseDate).toLocaleDateString()}
                    </p>

                    <p className="col-span-2">
                        <span className="text-purple-400">Description:</span>
                        <br />
                        {consoleItem.description}
                    </p>
                </div>
            </div>
        </div>
    );
}