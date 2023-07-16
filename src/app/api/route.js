import {NextResponse} from "next/server";

import OpenAPIClientAxios from "openapi-client-axios";

const vaultApi = new OpenAPIClientAxios({
    definition: "https://vault.immudb.io/ics/swagger/openapi.json",
});
vaultApi.init();


const vaultApiConfig = {
    baseURL: "https://vault.immudb.io/ics/api/v1/",
    headers: {
        "X-API-Key": process.env.VAULT_API_KEY,
    }
}


export async function GET() {
    const client = await vaultApi.getClient()
    const res = await client.CollectionsList({ledger: "default"}, null, vaultApiConfig)

    return NextResponse.json({
        ...res.data
    })
}
