import { StackHandler } from "@stackframe/stack";
import BackHomeButton from "@/components/BackHome";

export default function Handler() {
    return (
        <div className="bg-indigo-950 min-h-dvh flex items-center justify-center">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(/img/bg-home.jpg)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="bg-black/50 hero-content text-neutral-content w-125 flex-col text-center border-2 border-primary rounded-lg p-8">
                    <StackHandler fullPage={false} />
                    <BackHomeButton />
                </div>
            </div>
        </div>
    );
}
