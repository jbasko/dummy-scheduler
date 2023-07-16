import {NextResponse} from "next/server";
import {vaultApi, vaultApiConfig} from "@/lib/vault-api";

export async function GET() {
    const client = await vaultApi.getClient()
    const res = await client.SearchDocument(
        {ledger: "default", collection: "default"},
        {page: 1, perPage: 100},
        vaultApiConfig,
    )
    return NextResponse.json({
        ...res.data,
    })
}