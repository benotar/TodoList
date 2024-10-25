import {z} from "zod";

const passwordSchema = {
    regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.'
};

const usernameSchema = {
    regex: /^[a-zA-Z0-9_-]{2,50}$/,
    message: 'Username must be 2 to 50 characters long and can only contain letters, numbers, underscores, and dashes.'
}

export const loginFormSchema = z.object({
    username: z.string().regex(usernameSchema.regex, usernameSchema.message),
    password: z.string().regex(passwordSchema.regex, passwordSchema.message)
});


export const registerFormSchema = z.object({
    username: z.string().regex(usernameSchema.regex, usernameSchema.message),
    password: z.string().regex(passwordSchema.regex, passwordSchema.message),
    name: z.string().min(1, {
        message: 'Please enter your name'
    })
});