import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Starting seed...");

    // -----------------------------
    // 1. Clean database
    // -----------------------------

    await prisma.game.deleteMany();
    await prisma.console.deleteMany();

    console.log("🧹 Database cleaned");

    // -----------------------------
    // 2. Create Consoles
    // -----------------------------

    const consoles = await prisma.console.createMany({
        data: [
            {
                name: "PlayStation 5",
                manuFacturer: "Sony Interactive Entertainment",
                releaseDate: new Date("2020-11-12"),
                description:
                    "The PlayStation 5 (PS5) is a home video game console bringing 4K gaming at 120Hz and ray tracing support.",
            },
            {
                name: "Xbox Series X",
                manuFacturer: "Microsoft",
                releaseDate: new Date("2020-11-10"),
                description:
                    "The Xbox Series X is a high-performance console, featuring a custom AMD processor and 12 TFLOPS of graphical power.",
            },
            {
                name: "Nintendo Switch OLED Model",
                manuFacturer: "Nintendo",
                releaseDate: new Date("2021-10-08"),
                description:
                    "A hybrid console that can be used as a home console and a portable handheld device, now with a vibrant OLED screen.",
            },
            {
                name: "Nintendo Switch 2",
                manuFacturer: "Nintendo",
                releaseDate: new Date("2025-06-05"),
                description:
                    "The successor to the popular Nintendo Switch, featuring larger magnetic Joy-cons and enhanced performance.",
            },
            {
                name: "Steam Deck OLED",
                manuFacturer: "Valve",
                releaseDate: new Date("2023-11-16"),
                description:
                    "A powerful handheld gaming computer that plays PC games from your Steam library on the go.",
            },
        ],
    });

    console.log("🎮 5 consoles seeded");

    // -----------------------------
    // 3. Get consoles from DB
    // -----------------------------

    const allConsoles = await prisma.console.findMany();

    const ps5 = allConsoles.find((c) => c.name === "PlayStation 5");
    const xbox = allConsoles.find((c) => c.name === "Xbox Series X");
    const switchOLED = allConsoles.find(
        (c) => c.name === "Nintendo Switch OLED Model",
    );
    const switch2 = allConsoles.find((c) => c.name === "Nintendo Switch 2");
    const steamDeck = allConsoles.find((c) => c.name === "Steam Deck OLED");

    // -----------------------------
    // 4. Create Games
    // -----------------------------

    const gamesData = [
        /* ========= PS5 (10) ========= */
        {
            title: "God of War Ragnarök",
            developer: "Santa Monica Studio",
            releaseDate: new Date("2022-11-09"),
            price: 69.99,
            genre: "Action-adventure",
            description: "Kratos faces Ragnarök.",
            console_id: ps5?.id,
        },
        {
            title: "Spider-Man 2",
            developer: "Insomniac Games",
            releaseDate: new Date("2023-10-20"),
            price: 69.99,
            genre: "Action",
            description: "Two Spider-Men unite.",
            console_id: ps5?.id,
        },
        {
            title: "Demon's Souls",
            developer: "Bluepoint Games",
            releaseDate: new Date("2020-11-12"),
            price: 69.99,
            genre: "RPG",
            description: "Remake of a classic.",
            console_id: ps5?.id,
        },
        {
            title: "Ratchet & Clank Rift Apart",
            developer: "Insomniac Games",
            releaseDate: new Date("2021-06-11"),
            price: 69.99,
            genre: "Platform",
            description: "Dimensional adventure.",
            console_id: ps5?.id,
        },
        {
            title: "Returnal",
            developer: "Housemarque",
            releaseDate: new Date("2021-04-30"),
            price: 69.99,
            genre: "Shooter",
            description: "Sci-fi roguelike.",
            console_id: ps5?.id,
        },
        {
            title: "Horizon Forbidden West",
            developer: "Guerrilla Games",
            releaseDate: new Date("2022-02-18"),
            price: 69.99,
            genre: "RPG",
            description: "Explore new lands.",
            console_id: ps5?.id,
        },
        {
            title: "Gran Turismo 7",
            developer: "Polyphony Digital",
            releaseDate: new Date("2022-03-04"),
            price: 69.99,
            genre: "Racing",
            description: "Driving simulator.",
            console_id: ps5?.id,
        },
        {
            title: "Final Fantasy XVI",
            developer: "Square Enix",
            releaseDate: new Date("2023-06-22"),
            price: 69.99,
            genre: "RPG",
            description: "Epic fantasy.",
            console_id: ps5?.id,
        },
        {
            title: "The Last of Us Part I",
            developer: "Naughty Dog",
            releaseDate: new Date("2022-09-02"),
            price: 69.99,
            genre: "Adventure",
            description: "Remake story.",
            console_id: ps5?.id,
        },
        {
            title: "Death Stranding Director's Cut",
            developer: "Kojima Productions",
            releaseDate: new Date("2021-09-24"),
            price: 49.99,
            genre: "Adventure",
            description: "Reconnect humanity.",
            console_id: ps5?.id,
        },

        /* ========= XBOX (10) ========= */
        {
            title: "Halo Infinite",
            developer: "343 Industries",
            releaseDate: new Date("2021-12-08"),
            price: 59.99,
            genre: "Shooter",
            description: "Master Chief returns.",
            console_id: xbox?.id,
        },
        {
            title: "Forza Horizon 5",
            developer: "Playground Games",
            releaseDate: new Date("2021-11-09"),
            price: 59.99,
            genre: "Racing",
            description: "Mexico open world.",
            console_id: xbox?.id,
        },
        {
            title: "Starfield",
            developer: "Bethesda",
            releaseDate: new Date("2023-09-06"),
            price: 69.99,
            genre: "RPG",
            description: "Space RPG.",
            console_id: xbox?.id,
        },
        {
            title: "Gears 5",
            developer: "The Coalition",
            releaseDate: new Date("2019-09-10"),
            price: 39.99,
            genre: "Shooter",
            description: "War story.",
            console_id: xbox?.id,
        },
        {
            title: "Flight Simulator",
            developer: "Asobo Studio",
            releaseDate: new Date("2020-08-18"),
            price: 59.99,
            genre: "Simulation",
            description: "Fly planes.",
            console_id: xbox?.id,
        },
        {
            title: "Sea of Thieves",
            developer: "Rare",
            releaseDate: new Date("2018-03-20"),
            price: 39.99,
            genre: "Adventure",
            description: "Pirate life.",
            console_id: xbox?.id,
        },
        {
            title: "State of Decay 2",
            developer: "Undead Labs",
            releaseDate: new Date("2018-05-22"),
            price: 29.99,
            genre: "Survival",
            description: "Zombie survival.",
            console_id: xbox?.id,
        },
        {
            title: "Hi-Fi Rush",
            developer: "Tango Gameworks",
            releaseDate: new Date("2023-01-25"),
            price: 29.99,
            genre: "Action",
            description: "Rhythm combat.",
            console_id: xbox?.id,
        },
        {
            title: "Psychonauts 2",
            developer: "Double Fine",
            releaseDate: new Date("2021-08-25"),
            price: 59.99,
            genre: "Platform",
            description: "Mental adventure.",
            console_id: xbox?.id,
        },
        {
            title: "Redfall",
            developer: "Arkane",
            releaseDate: new Date("2023-05-02"),
            price: 69.99,
            genre: "Shooter",
            description: "Vampire co-op.",
            console_id: xbox?.id,
        },

        /* ========= SWITCH OLED (10) ========= */
        {
            title: "Zelda Tears of the Kingdom",
            developer: "Nintendo",
            releaseDate: new Date("2023-05-12"),
            price: 69.99,
            genre: "Adventure",
            description: "Zelda sequel.",
            console_id: switchOLED?.id,
        },
        {
            title: "Zelda Breath of the Wild",
            developer: "Nintendo",
            releaseDate: new Date("2017-03-03"),
            price: 59.99,
            genre: "Adventure",
            description: "Open world Zelda.",
            console_id: switchOLED?.id,
        },
        {
            title: "Super Mario Odyssey",
            developer: "Nintendo",
            releaseDate: new Date("2017-10-27"),
            price: 59.99,
            genre: "Platform",
            description: "Mario adventure.",
            console_id: switchOLED?.id,
        },
        {
            title: "Mario Kart 8 Deluxe",
            developer: "Nintendo",
            releaseDate: new Date("2017-04-28"),
            price: 59.99,
            genre: "Racing",
            description: "Kart racing.",
            console_id: switchOLED?.id,
        },
        {
            title: "Animal Crossing",
            developer: "Nintendo",
            releaseDate: new Date("2020-03-20"),
            price: 59.99,
            genre: "Simulation",
            description: "Island sim.",
            console_id: switchOLED?.id,
        },
        {
            title: "Smash Bros Ultimate",
            developer: "Nintendo",
            releaseDate: new Date("2018-12-07"),
            price: 59.99,
            genre: "Fighting",
            description: "Crossover fight.",
            console_id: switchOLED?.id,
        },
        {
            title: "Splatoon 3",
            developer: "Nintendo",
            releaseDate: new Date("2022-09-09"),
            price: 59.99,
            genre: "Shooter",
            description: "Ink battles.",
            console_id: switchOLED?.id,
        },
        {
            title: "Pokémon Scarlet",
            developer: "Game Freak",
            releaseDate: new Date("2022-11-18"),
            price: 59.99,
            genre: "RPG",
            description: "Pokémon adventure.",
            console_id: switchOLED?.id,
        },
        {
            title: "Pokémon Violet",
            developer: "Game Freak",
            releaseDate: new Date("2022-11-18"),
            price: 59.99,
            genre: "RPG",
            description: "Alternate Pokémon.",
            console_id: switchOLED?.id,
        },
        {
            title: "Luigi's Mansion 3",
            developer: "Next Level Games",
            releaseDate: new Date("2019-10-31"),
            price: 59.99,
            genre: "Adventure",
            description: "Ghost hunting.",
            console_id: switchOLED?.id,
        },

        /* ========= SWITCH 2 (10) ========= */
        {
            title: "Mario Kart World",
            developer: "Nintendo",
            releaseDate: new Date("2025-06-05"),
            price: 69.99,
            genre: "Racing",
            description: "Next-gen kart.",
            console_id: switch2?.id,
        },
        {
            title: "Zelda Echoes",
            developer: "Nintendo",
            releaseDate: new Date("2025-07-10"),
            price: 69.99,
            genre: "Adventure",
            description: "New Zelda.",
            console_id: switch2?.id,
        },
        {
            title: "Metroid Prime 4",
            developer: "Nintendo",
            releaseDate: new Date("2025-08-01"),
            price: 69.99,
            genre: "Shooter",
            description: "Sci-fi shooter.",
            console_id: switch2?.id,
        },
        {
            title: "Mario Odyssey 2",
            developer: "Nintendo",
            releaseDate: new Date("2025-09-15"),
            price: 69.99,
            genre: "Platform",
            description: "Mario sequel.",
            console_id: switch2?.id,
        },
        {
            title: "Splatoon 4",
            developer: "Nintendo",
            releaseDate: new Date("2025-10-01"),
            price: 69.99,
            genre: "Shooter",
            description: "Ink battles return.",
            console_id: switch2?.id,
        },
        {
            title: "Animal Crossing Next",
            developer: "Nintendo",
            releaseDate: new Date("2025-11-01"),
            price: 69.99,
            genre: "Simulation",
            description: "New island life.",
            console_id: switch2?.id,
        },
        {
            title: "Pokémon Legends Z",
            developer: "Game Freak",
            releaseDate: new Date("2025-12-01"),
            price: 69.99,
            genre: "RPG",
            description: "New Pokémon era.",
            console_id: switch2?.id,
        },
        {
            title: "Donkey Kong Returns",
            developer: "Nintendo",
            releaseDate: new Date("2025-06-20"),
            price: 59.99,
            genre: "Platform",
            description: "DK comeback.",
            console_id: switch2?.id,
        },
        {
            title: "Kirby Galaxy",
            developer: "HAL Laboratory",
            releaseDate: new Date("2025-07-25"),
            price: 59.99,
            genre: "Platform",
            description: "Kirby space.",
            console_id: switch2?.id,
        },
        {
            title: "F-Zero X Neo",
            developer: "Nintendo",
            releaseDate: new Date("2025-08-30"),
            price: 59.99,
            genre: "Racing",
            description: "Fast racing.",
            console_id: switch2?.id,
        },

        /* ========= STEAM DECK (10) ========= */
        {
            title: "Hades",
            developer: "Supergiant Games",
            releaseDate: new Date("2020-09-17"),
            price: 24.99,
            genre: "Roguelike",
            description: "Escape hell.",
            console_id: steamDeck?.id,
        },
        {
            title: "Stardew Valley",
            developer: "ConcernedApe",
            releaseDate: new Date("2016-02-26"),
            price: 14.99,
            genre: "Simulation",
            description: "Farm life.",
            console_id: steamDeck?.id,
        },
        {
            title: "Celeste",
            developer: "Matt Makes Games",
            releaseDate: new Date("2018-01-25"),
            price: 19.99,
            genre: "Platform",
            description: "Climb mountain.",
            console_id: steamDeck?.id,
        },
        {
            title: "Dead Cells",
            developer: "Motion Twin",
            releaseDate: new Date("2018-08-07"),
            price: 24.99,
            genre: "Roguelike",
            description: "Fast combat.",
            console_id: steamDeck?.id,
        },
        {
            title: "Hollow Knight",
            developer: "Team Cherry",
            releaseDate: new Date("2017-02-24"),
            price: 14.99,
            genre: "Metroidvania",
            description: "Dark world.",
            console_id: steamDeck?.id,
        },
        {
            title: "Cuphead",
            developer: "Studio MDHR",
            releaseDate: new Date("2017-09-29"),
            price: 19.99,
            genre: "Platform",
            description: "Cartoon boss fights.",
            console_id: steamDeck?.id,
        },
        {
            title: "Terraria",
            developer: "Re-Logic",
            releaseDate: new Date("2011-05-16"),
            price: 9.99,
            genre: "Sandbox",
            description: "2D adventure.",
            console_id: steamDeck?.id,
        },
        {
            title: "Slay the Spire",
            developer: "MegaCrit",
            releaseDate: new Date("2019-01-23"),
            price: 24.99,
            genre: "Card",
            description: "Deck builder.",
            console_id: steamDeck?.id,
        },
        {
            title: "Disco Elysium",
            developer: "ZA/UM",
            releaseDate: new Date("2019-10-15"),
            price: 39.99,
            genre: "RPG",
            description: "Detective RPG.",
            console_id: steamDeck?.id,
        },
        {
            title: "Undertale",
            developer: "Toby Fox",
            releaseDate: new Date("2015-09-15"),
            price: 9.99,
            genre: "RPG",
            description: "Unique RPG.",
            console_id: steamDeck?.id,
        },
    ];

    for (const game of gamesData) {
        if (!game.console_id) continue;

        await prisma.game.create({
            data: game,
        });
    }

    console.log("🕹️ 10 games seeded");

    console.log("✅ Seed completed successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
