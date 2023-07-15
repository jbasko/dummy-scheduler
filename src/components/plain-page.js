import Navbar from "@/components/navbar";

export default function PlainPage({title, children}) {
    return (
        <main className={"container mx-auto"}>
            <Navbar />
            {title && <h1 className={"text-3xl font-bold mt-4 mb-8 text-neutral-700"}>{title}</h1>}
            {children}
        </main>
    )
}
