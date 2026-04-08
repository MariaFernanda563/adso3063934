"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type ConsoleType = {
    id: number;
    name: string;
    image: string | null;
    releaseDate: Date;
    manuFacturer: string;
    description: string;
};

type ConsolesInfoProps = {
    consoles: ConsoleType[];
    deleteConsole: (formData: FormData) => Promise<void>;
};

export default function ConsolesInfo({ consoles, deleteConsole }: ConsolesInfoProps) {
    const router = useRouter();

    return (
        <div>
            <h1 className="text-3xl font-bold text-purple-400 mb-6">
                Consoles
            </h1>

            <button
                onClick={() => router.push("/consoles/add")}
                className="btn btn-soft btn-success mb-6"
            >
                Add Console
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {consoles.map((consoleItem) => (
                    <div
                        key={consoleItem.id}
                        className="card card-compact bg-black shadow-sm h-full border border-purple-500/20"
                    >
                        <figure className="relative w-full h-48">
                            <Image
                                src={`/img/${consoleItem.image || "no-image.png"}`}
                                alt={consoleItem.name}
                                fill
                                className="object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title text-purple-300">
                                {consoleItem.name}
                            </h2>

                            <p className="text-gray-300 line-clamp-3">
                                {consoleItem.description}
                            </p>

                            <div className="flex gap-2 mt-4 justify-end">
                                <button
                                    onClick={() =>
                                        router.push(
                                            `/consoles/${consoleItem.id}`,
                                        )
                                    }
                                    className="btn btn-soft btn-primary w-20"
                                >
                                    View
                                </button>

                                <button
                                    onClick={() =>
                                        router.push(
                                            `/consoles/${consoleItem.id}/edit`,
                                        )
                                    }
                                    className="btn btn-soft btn-warning w-20"
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-soft btn-error"
                                    onClick={() =>
                                        (
                                            document.getElementById(
                                                `my_modal_${consoleItem.id}`,
                                            ) as HTMLDialogElement
                                        ).showModal()
                                    }
                                >
                                    Delete
                                </button>
                                <dialog
                                    id={`my_modal_${consoleItem.id}`}
                                    className="modal modal-bottom sm:modal-middle"
                                >
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">
                                            Alert!
                                        </h3>
                                        <p className="py-4">
                                            Are you sure you want to delete this console?
                                        </p>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <input type="hidden" name="id" value={consoleItem.id} />
                                                <button formAction={deleteConsole} className="btn btn-soft btn-error">
                                                    Confirm
                                                </button>
                                                <a href="/consoles" className="btn">
                                                    Cancel
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
