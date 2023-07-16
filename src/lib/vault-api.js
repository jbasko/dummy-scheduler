import OpenAPIClientAxios from "openapi-client-axios";

export const vaultApi = new OpenAPIClientAxios({
    definition: "https://vault.immudb.io/ics/swagger/openapi.json",
});
vaultApi.init();


export const vaultApiConfig = {
    baseURL: "https://vault.immudb.io/ics/api/v1/",
    headers: {
        "X-API-Key": process.env.VAULT_API_KEY,
    }
}

export const ensureVaultSetup = async (client) => {
    const initialList = await client.CollectionsList({ledger: "default"}, null, vaultApiConfig)
    let calendarFound = false
    for (const collection of initialList.data.collections) {
        if (collection.name === "calendar") {
            calendarFound = true
        } else {
            await client.CollectionDelete({ledger: "default", collection: collection.name}, null, vaultApiConfig)
        }
    }
    if (!calendarFound) {
        await client.CollectionCreate({ledger: "default"}, {name: "calendar"}, vaultApiConfig)
    }
}
