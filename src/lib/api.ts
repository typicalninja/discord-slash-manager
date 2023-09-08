import { get } from "svelte/store";
import { authStore } from "./localStore";
import axios, { type AxiosRequestConfig } from 'axios'

export function fetchAPI(url: string, request: AxiosRequestConfig = {}) {
    const auth = get(authStore);

    const newHeaders = {
        ...request?.headers,
        Authorization: `Bearer ${auth.accessToken}`,
    }

    request.responseType = 'json'
    // apply new headers
    request.headers = newHeaders;

   return axios(`https://discord.com/api/v10/${url}`, request);
}

/**
 * Get a access token
 * 
 * @param clientId 
 * @param clientSecret 
 * @returns 
 */
export async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
    const data = new URLSearchParams();
	data.set('grant_type', 'client_credentials');
	data.set('scope', 'guilds applications.commands.update');

	const res = await axios.post(`https://discord.com/api/oauth2/token`, data, {
		auth: {
			username: clientId,
			password: clientSecret,
		},
	});

    return res.data.access_token
}