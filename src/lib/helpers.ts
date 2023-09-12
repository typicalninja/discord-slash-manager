import { OptionTypes } from "./constants";

export function generateRandomAlphaNumeric(length: number) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }
    
    return result;
}


export function OptionTypeToName(type: number | string) {
    type = Number(type);
    switch(type) {
        case OptionTypes.SubCommand:
            return 'Sub command';
        case OptionTypes.SubCommandGroup: 
            return 'Sub command group';
        case OptionTypes.String:
            return 'String';
        case OptionTypes.Integer:
            return 'Integer';
        case OptionTypes.Boolean:
            return 'Boolean';
        case OptionTypes.User:
            return 'User';
        case OptionTypes.Channel:
            return 'Channel';
        case OptionTypes.Role:
            return 'Role';
        case OptionTypes.Mentionable:
            return 'Mentionable';
        case OptionTypes.Number:
            return 'Number';
        case OptionTypes.Attachment:
            return 'Attachment';
        default:
            return 'Unknown';
    }
}