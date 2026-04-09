import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import GamesInfo from "@/components/GamesInfo";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

export default async function GamesPage({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await stackServerApp.getUser();
    if (!user) {
        redirect('/');
    }

    const games = await prisma.game.findMany({
        include: { console: true },
    });

    async function deleteGame(formData: FormData) {
        "use server";

        const idValue = formData.get("id");
        const id = Number(idValue);

        if (!idValue || Number.isNaN(id) || id <= 0) {
            throw new Error("Invalid game id for delete action.");
        }

        await prisma.game.delete({
            where: { id },
        });
    }

    return (
        <SideBar currentPath="/games">
            <GamesInfo games={games} deleteGame={deleteGame} />
        </SideBar>
    );
}

