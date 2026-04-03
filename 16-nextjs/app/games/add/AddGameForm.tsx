"use client";

import { useState } from "react";
import Image from "next/image";

export default function AddGameForm() {
    const [preview, setPreview] = useState("/img/no-cover.png");

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-48 h-48 relative border rounded-lg bg-black">
                <Image
                    src={preview}
                    alt="preview"
                    fill
                    className="object-contain"
                />
            </div>

            <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setPreview(URL.createObjectURL(file));
                }}
                className="file-input file-input-bordered w-full"
            />
        </div>
    );
}