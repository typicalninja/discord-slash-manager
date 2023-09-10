
export enum Urls {
    DiscordInvite = "https://discord.gg/ynwckXS9T2",
    Github = "https://github.com/typicalninja/discord-slash-manager"
}

export const discordIdRegex = /^[0-9]{18}$/;

export interface DiscordInteractionOption {
    type: number;
    name: string;
    description: string;
    required: boolean;
}

export interface DiscordInteraction {
    id: string;
    type: number;
    name: string;
    description: string;
    dm_permission: boolean;
    nsfw: boolean;
    options: DiscordInteractionOption[]
}

export function typeToName(type: number | string): string {
    type = Number(type)
    switch (type) {
        case 1:
            return 'Chat Input';
        case 2:
            return 'User';
        case 3:
            return 'Message';
        default:
            return 'Unknown';
    }
}
