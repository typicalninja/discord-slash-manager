import { get } from "svelte/store";
import { fetchAPI } from "./api";
import { applicationInfo } from "./localStore";
import type { DiscordInteraction } from "./constants";



export async function fetchUser() {
    const req = await fetchAPI('oauth2/@me');
    const { application } = req.data;
    return application?.bot ?? { }
}


export async function fetchCommands() {
    const appInfo = get(applicationInfo)
    const commandsData = await fetchAPI(`applications/${appInfo.id}/commands`);
    return commandsData.data as DiscordInteraction[];
}