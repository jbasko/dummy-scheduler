import Link from "next/link";

export default function Navbar({children}) {
    return (
        <div className={"flex flex-row gap-4 my-2"}>
            <Link href={"/"} className={"link"}>Home</Link>
            <Link href={"/scheduler"} className={"link"}>Scheduler</Link>
            {children}
        </div>
    )
}
