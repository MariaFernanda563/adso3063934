export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import AddConsoleForm from "@/app/consoles/add/AddConsoleForm";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

async function updateConsole(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const manuFacturer = formData.get("manuFacturer") as string;
    const releaseDate = formData.get("releaseDate") as string;

    const file = formData.get("image") as File;

    const consoleItem = await prisma.console.findUnique({
        where: { id },
    });

    if (!consoleItem) {
        throw new Error("Console not found");
    }

    let filename = consoleItem.image || "no-image.png";

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        filename = Date.now() + "-" + file.name;

        const filepath = path.join(process.cwd(), "public/img", filename);

        await fs.writeFile(filepath, buffer);
    }

    await prisma.console.update({
        where: { id },
        data: {
            name,
            description,
            manuFacturer,
            releaseDate: new Date(releaseDate),
            image: filename,
        },
    });

    redirect("/consoles");
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const consoleItem = await prisma.console.findUnique({
        where: { id: Number(id) },
    });

    if (!consoleItem) {
        throw new Error("Console not found");
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                action={updateConsole}
                className="bg-black/80 border border-purple-500/30 p-8 rounded-2xl w-full max-w-4xl flex flex-col gap-6 shadow-xl"
            >
                <h1 className="text-3xl font-bold text-purple-400 text-center">
                    Edit Console
                </h1>

                <input type="hidden" name="id" value={consoleItem.id} />

                <div className="flex justify-center">
                    <AddConsoleForm initialImage={consoleItem.image || "no-image.png"} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="name"
                        defaultValue={consoleItem.name}
                        placeholder="Console Name"
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        name="manuFacturer"
                        defaultValue={consoleItem.manuFacturer}
                        placeholder="Manufacturer"
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <input
                        type="date"
                        name="releaseDate"
                        defaultValue={consoleItem.releaseDate.toISOString().split("T")[0]}
                        className="input input-bordered input-primary w-full"
                        required
                    />

                    <div className="hidden md:block"></div>

                    <textarea
                        name="description"
                        defaultValue={consoleItem.description}
                        placeholder="Description"
                        className="textarea textarea-bordered textarea-primary md:col-span-2 w-full"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="btn btn-primary flex-1 text-lg"
                    >
                        Update Console
                    </button>

                    <a
                        href="/consoles"
                        className="btn btn-outline btn-primary flex-1 text-lg"
                    >
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    );
}