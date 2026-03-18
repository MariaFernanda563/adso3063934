"use client";
import {ArrowLeftIcon} from "@phosphor-icons/react"
import Link from "next/link"

export default function BackHomeButton() {
    return (
        <div>
            <Link href="/" className="btn btn-outline mt-8 w-full btn-primary">
                <ArrowLeftIcon  size={24}/>
                <span>Go to home</span>
            </Link>
        </div>
    );
}