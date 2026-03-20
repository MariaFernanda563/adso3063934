import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from "next/image";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

export default async function ConsolesInfo() {
    const consoles = await prisma.console.findMany();

    return (
        <div>
            <h1>Consoles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {consoles.map((console) => (
                    <div key={console.id} className="card card-compact bg-black shadow-sm h-full">
                        <figure className="relative w-full h-48">
                            <Image
                                        src={`/img/${console.image}`}
                                        alt={console.name}
                                        fill
                                        className="object-cover"
                                    />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{console.name}</h2>
                            <p>Console: {console.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}