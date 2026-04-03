export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { redirect } from "next/navigation";
import AddGameForm from "./AddGameForm";
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

/* SERVER ACTION */
async function addGame(formData: FormData) {
    "use server";

    try {
        const title = formData.get("title") as string;
        const developer = formData.get("developer") as string;
        const releasedate = formData.get("releasedate") as string;
        const price = parseFloat(formData.get("price") as string);
        const genre = formData.get("genre") as string;
        const description = formData.get("description") as string;

        const consoleRaw = formData.get("console_id");

        if (!consoleRaw) {
            throw new Error("Console is required");
        }

        const console_id = parseInt(consoleRaw.toString());

        const file = formData.get("cover") as File;

        let filename = "no-cover.png";

        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            filename = Date.now() + "-" + file.name;

            const filepath = path.join(process.cwd(), "public/img", filename);

            await fs.writeFile(filepath, buffer);
        }

        await prisma.game.create({
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
    } catch (error) {
        console.error("ERROR REAL:", error);
        throw error;
    }
}

/* PAGE */
export default async function Page() {
    const consoles = await prisma.console.findMany();

    return (
        <div className="min-h-screen flex justify-center items-center bg-black text-white">
            <form
                action={addGame}
                className="bg-black/80 border border-purple-500/30 p-8 rounded-2xl w-full max-w-4xl flex flex-col gap-6 shadow-xl"
            >
                <h1 className="text-3xl font-bold text-center">
                    Add Game
                </h1>

                {/* IMAGEN */}
                <div className="flex justify-center">
                    <AddGameForm />
                </div>

                {/* INPUTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="title"
                        placeholder="Title"
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        name="developer"
                        placeholder="Developer"
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        type="date"
                        name="releasedate"
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        placeholder="Price"
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        name="genre"
                        placeholder="Genre"
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <select
                        name="console_id"
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
                        placeholder="Description"
                        className="textarea textarea-bordered textarea-primary col-span-1 md:col-span-2 w-full"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <button type="submit" className="btn btn-primary flex-1 text-lg">
                        Add Game
                    </button>
                    <a href="/games" className="btn flex-1 text-lg">
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    );
}
