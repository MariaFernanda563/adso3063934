export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import AddConsoleForm from "./AddConsoleForm";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

async function addConsole(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const manufacturer = formData.get("manufacturer") as string;

    const file = formData.get("image") as File;

    let filename = "no-image.png";

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        filename = Date.now() + "-" + file.name;

        const filepath = path.join(process.cwd(), "public/img", filename);

        await fs.writeFile(filepath, buffer);
    }

    await prisma.console.create({
        data: {
            name,
            description,
            manuFacturer: manufacturer,
            releaseDate: new Date(),
            image: filename,
        },
    });

    redirect("/consoles");
}

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-black text-white">
            <form
                action={addConsole}
                className="bg-black/80 border border-purple-500/30 p-8 rounded-2xl w-full max-w-3xl flex flex-col gap-6 shadow-xl"
            >
                <h1 className="text-3xl text-purple-400 text-center">
                    Add Console
                </h1>

                <div className="flex justify-center">
                    <AddConsoleForm />
                </div>

                <input
                    name="name"
                    placeholder="Console Name"
                    className="input input-bordered input-primary w-full"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="textarea textarea-bordered textarea-primary w-full"
                    required
                />

                <input
                    name="manufacturer"
                    placeholder="Manufacturer"
                    className="input input-bordered input-primary w-full"
                    required
                />

                <button className="btn btn-primary">
                    Add Console
                </button>
            </form>
        </div>
    );
}