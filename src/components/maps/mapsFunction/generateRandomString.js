
export const generateRandomString = () => {

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]};:,<.>/?";
    let result = "";
    for (let i = 0; i < 32; i++) {

        result += chars[Math.floor(Math.random() * chars.length)];

    }

    return result;

}