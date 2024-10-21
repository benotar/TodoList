import {z} from "zod";

const passwordSchema = {
    regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: 'Invalid password.'
};

const usernameSchema = {
    regex: /^[a-zA-Z0-9_-]{2,50}$/,
    message: 'Invalid username'
}

export const loginFormSchema = z.object({
    username: z.string().regex(usernameSchema.regex, usernameSchema.message),
    password: z.string().regex(passwordSchema.regex, passwordSchema.message)
});