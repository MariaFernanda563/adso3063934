"use client";
import { Fingerprint } from "@phosphor-icons/react";
import { UserPlusIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function Home() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(/img/bg-home.jpg)",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="bg-black/50 hero-content text-neutral-content text-center border-2 border-primary rounded-lg p-8">
                <div className="max-w-md">
                    <img src="/img/logo.png" alt="Logo" />
                    <p className="text-justify">
                        <strong>GameNext.js</strong> is a modern platform to
                        manage and organize videogames. Built with Next.js, it
                        uses Prisma, Neon database, and Stack Auth to provide
                        secure authentication, fast performance, and scalable
                        data management.
                    </p>
                    <Link
                        href="handler/sign-in"
                        className="btn btn-outline btn-primary mt-8 px-10"
                    ><Fingerprint size={24} className="mr-2" />
                        Sign In
                    </Link>
                    <Link
                        href="handler/sign-up"
                        className="btn btn-outline btn-primary mt-8 px-10"
                    ><UserPlusIcon size={24} className="mr-2" />
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}