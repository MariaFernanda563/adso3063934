"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
    initialImage?: string;
};

export default function AddConsoleForm({ initialImage }: Props) {
    const [preview, setPreview] = useState(
        initialImage ? `/img/${initialImage}` : "/img/no-image.png"
    );

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-48 h-48 relative border rounded-lg bg-black overflow-hidden">
                <Image
                    src={preview}
                    alt="preview"
                    fill
                    className="object-contain"
                />
            </div>

            <input
                type="file"
                name="image"
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