import {NextResponse} from "next/server";
import {ensureVaultSetup, vaultApi, vaultApiConfig} from "@/lib/vault-api";


export async function GET() {
    const client = await vaultApi.getClient()

    await ensureVaultSetup(client)

    const listRes = await client.CollectionsList({ledger: "default"}, null, vaultApiConfig)
    return NextResponse.json({
        ...listRes.data
    })
}
