import {NextResponse} from "next/server";

export async function GET() {

    const res = await fetch("https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-API-Key": process.env.VAULT_API_KEY,
        },
        body: JSON.stringify({
            "page": 1,
            "perPage": 100,
        }),
    })
    const data = await res.json()

    return NextResponse.json({
        ...data,
    })
}
