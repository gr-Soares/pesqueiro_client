"use client";

import { Login, Register } from "./models/user";
import { api_request, api_response, api } from "./conn";

export function saveToken(token: string) {
    localStorage.setItem("token", token)
}

export function retrieveToken() {
    return localStorage.getItem("token")
}

export async function login(data: Login) {
    const req: api_request = {
        method: "POST",
        data: data,
        url: "/auth/login"
    }

    let response: api_response = await api(req);

    if (response.status == 200) {
        saveToken(response.data.token)
        return true;
    }

    return false;
}