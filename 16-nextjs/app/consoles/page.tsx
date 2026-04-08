import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import ConsolesInfo from "@/components/ConsolesInfo";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

export default async function ConsolesPage({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await stackServerApp.getUser();
    if (!user) {
        redirect("/");
    }

    const consoles = await prisma.console.findMany();

    async function deleteConsole(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));

    if (!id || Number.isNaN(id)) {
        throw new Error("Invalid console id");
    }

    await prisma.game.deleteMany({
        where: {
            console_id: id,
        },
    });

    await prisma.console.delete({
        where: { id },
    });

    redirect("/consoles");
}

    return (
        <SideBar currentPath={"/consoles"}>
            <ConsolesInfo consoles={consoles} deleteConsole={deleteConsole} />
        </SideBar>
    );
}