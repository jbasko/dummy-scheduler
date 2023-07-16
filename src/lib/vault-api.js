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
