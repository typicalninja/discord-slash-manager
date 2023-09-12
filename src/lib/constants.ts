
export enum Urls {
    DiscordInvite = "https://discord.gg/ynwckXS9T2",
    Github = "https://github.com/typicalninja/discord-slash-manager"
}


// regex for validation
export const discordIdRegex = /^[0-9]{18}$/;
export const chatInputRegex = /^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u

/* All options supported by discord rolled into one */
export interface DiscordInteractionOption {
    type: OptionTypes;
    id: number;
    name: string;
    description: string;
    autocomplete:  boolean;
    required: boolean;
    min_value: number | null;
    max_value: number | null;
    min_length: number | null;
    max_length: number | null;
}

export type AccordionOption = DiscordInteractionOption & { open: boolean; itemId: string };

export interface DiscordInteraction {
    id: string;
    type: number;
    name: string;
    description: string;
    dm_permission: boolean;
    nsfw: boolean;
    options: DiscordInteractionOption[]
}

export enum OptionTypes {
    SubCommand = 1,
    SubCommandGroup = 2,
    String = 3,
    Integer = 4,
    Boolean = 5,
    User = 6,
    Channel = 7,
    Role = 8,
    Mentionable = 9,
    Number = 10,
    Attachment = 11,
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
