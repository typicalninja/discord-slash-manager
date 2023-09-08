import { fetchAPI } from "./api";

export async function fetchUser() {
    const req = await fetchAPI('oauth2/@me');
    const { application } = req.data;
    return application?.bot ?? { }
}
