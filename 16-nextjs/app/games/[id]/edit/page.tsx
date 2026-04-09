export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { redirect } from "next/navigation";
import AddGameForm from "../../add/AddGameForm";
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

async function updateGame(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));

    const title = formData.get("title") as string;
    const developer = formData.get("developer") as string;
    const releasedate = formData.get("releasedate") as string;
    const price = parseFloat(formData.get("price") as string);
    const genre = formData.get("genre") as string;
    const description = formData.get("description") as string;
    const console_id = parseInt(formData.get("console_id") as string);

    const file = formData.get("cover") as File;

    const game = await prisma.game.findUnique({
        where: { id },
    });

    if (!game) throw new Error("Game not found");

    let filename = game.cover;

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        filename = Date.now() + "-" + file.name;

        const filepath = path.join(process.cwd(), "public/img", filename);

        await fs.writeFile(filepath, buffer);
    }

    await prisma.game.update({
        where: { id },
        data: {
            title,
            developer,
            releaseDate: new Date(releasedate),
            price,
            genre,
            description,
            console_id,
            cover: filename,
        },
    });

    redirect("/games");
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const game = await prisma.game.findUnique({
        where: { id: Number(id) },
    });

    const consoles = await prisma.console.findMany();

    return (
        <div className="min-h-screen flex justify-center items-center bg-black text-white">
            <form
                action={updateGame}
                className="bg-black/80 border border-purple-500/30 p-8 rounded-2xl w-full max-w-4xl flex flex-col gap-6 shadow-xl"
            >
                <h1 className="text-3xl font-bold text-purple-400 text-center">
                    Edit Game
                </h1>

                {/* ID OCULTO */}
                <input type="hidden" name="id" value={game?.id} />

                {/* IMAGEN */}
                <div className="flex justify-center">
                    <AddGameForm initialImage={game?.cover || "no-cover.png"} />
                </div>

                {/* INPUTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="title"
                        defaultValue={game?.title}
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        name="developer"
                        defaultValue={game?.developer}
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        type="date"
                        name="releasedate"
                        defaultValue={
                            game?.releaseDate.toISOString().split("T")[0]
                        }
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        defaultValue={game?.price}
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        name="genre"
                        defaultValue={game?.genre}
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <select
                        name="console_id"
                        defaultValue={game?.console_id}
                        className="select select-bordered select-primary w-full"
                        required
                    >
                        <option value="">Select Console</option>
                        {consoles.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <textarea
                        name="description"
                        defaultValue={game?.description}
                        className="textarea textarea-bordered textarea-primary col-span-1 md:col-span-2 w-full"
                        required
                    />
                </div>

                {/* BOTONES */}
                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary flex-1 text-lg"
                    >
                        Update Game
                    </button>

                    <a
                        href="/games"
                        className="btn btn-outline btn-primary flex-1 text-lg"
                    >
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    );
}
