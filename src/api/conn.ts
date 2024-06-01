const API_URL = "http://localhost:8080";

export interface api_request {
    method: "POST" | "PUT" | "GET" | "DELETE"
    token?: string
    url: string
    data?: any
}

export interface api_response {
    data: any
    status: number
}

export async function api(
    data: api_request
): Promise<any> {
    const headers: Headers = new Headers();

    headers.append("Access-Control-Allow-Origin", "*")

    if (data.method === "POST" || data.method === "PUT")
        headers.append("Content-type", "application/json ");

    if (data.token)
        headers.append("Authorization", "Bearer " + data.token);

    const response = await fetch(API_URL + data.url, {
        method: data.method,
        headers: headers,
        body: data.data ? JSON.stringify(data.data) : undefined,
        cache: "no-store",
    });

    var json

    if(response.body){
        try{
            json = await response.json()
        }catch{
            json = {}
        }
    }

    const result: api_response = {
        data: json,
        status: response.status
    };

    return result;
}