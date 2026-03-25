"use client"

import { useState } from "react"

export default function ImagePreview() {

    const [preview, setPreview] = useState<string | null>(null)

    const handleImage = (e: any) => {
        const file = e.target.files[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        setPreview(url)
    }

    return (
        <div className="col-span-2 flex flex-col items-center gap-3">

            <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={handleImage}
                className="file-input file-input-bordered w-full"
            />

            {preview && (
                <img
                    src={preview}
                    className="w-56 h-56 object-cover rounded-xl border"
                />
            )}

        </div>
    )
}