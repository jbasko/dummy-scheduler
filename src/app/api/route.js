import {NextResponse} from "next/server";
import {vaultApi, vaultApiConfig} from "@/lib/vault-api";


export async function GET() {
    const client = await vaultApi.getClient()
    const res = await client.CollectionsList({ledger: "default"}, null, vaultApiConfig)

    return NextResponse.json({
        ...res.data
    })
}
