export const runtime = "nodejs";
import Link from "next/link";
import Image from "next/image";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import ImagePreview from "./ImagePreview";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

async function addGame(formData: FormData) {
    /* SERVER ACTION */
    "use server";

    const title = formData.get("title") as string;
    const developer = formData.get("developer") as string;
    const releasedate = formData.get("releasedate") as string;
    const price = parseFloat(formData.get("price") as string);
    const genre = formData.get("genre") as string;
    const description = formData.get("description") as string;
    const console_id = parseInt(formData.get("console_id") as string);

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
}

export default async function AddGame() {
    const consoles = await prisma.console.findMany();

    return (
        <div className="hero min-h-screen bg- text-white">
            <div className="hero-content flex-col">
                <div className="card bg-black">
                    <div className="card-body m-4">
                        <h1 className="text-3xl mb-6 ml-10">Add New Game</h1>

                        <form action={addGame} className="flex flex-col gap-4">
                            <fieldset className="grid grid-cols-2 gap-4">
                                <ImagePreview />
                                <input
                                    name="title"
                                    placeholder="Title"
                                    className="input input-bordered"
                                    required
                                />

                                <input
                                    name="developer"
                                    placeholder="Developer"
                                    className="input input-bordered"
                                    required
                                />

                                <input
                                    type="date"
                                    name="releasedate"
                                    className="input input-bordered"
                                    required
                                />

                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    placeholder="Price"
                                    className="input input-bordered"
                                    required
                                />

                                <input
                                    name="genre"
                                    placeholder="Genre"
                                    className="input input-bordered"
                                    required
                                />

                                <select
                                    name="console_id"
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">Select Console</option>

                                    {consoles.map((console) => (
                                        <option
                                            key={console.id}
                                            value={console.id}
                                        >
                                            {console.name}
                                        </option>
                                    ))}
                                </select>

                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    className="textarea textarea-bordered col-span-2"
                                    required
                                />
                            </fieldset>
                            <button className="btn btn-primary">
                                Add Game
                            </button>
                            <Link href={`/games`}>
                                <button className="btn btn-primary">
                                    Cancel
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
