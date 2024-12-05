import {z} from "zod";

const passwordSchema = {
    regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long."
};

const usernameSchema = {
    regex: /^[a-zA-Z0-9_-]{2,50}$/,
    message: "Username must be 2 to 50 characters long and can only contain letters, numbers, underscores, and dashes."
};

const nameSchema = {
    regex: /^[a-zA-Z\s]+$/,
    message: "Name can only contain letters and spaces."
}

export const loginFormSchema = z.object({
    userName: z.string().regex(usernameSchema.regex, usernameSchema.message),
    password: z.string().regex(passwordSchema.regex, passwordSchema.message),
    confirm: z.string()
}).refine(data => data.password === data.confirm, {
    message: "Passwords don't match.",
    path: ['confirm']
});

export const registerFormSchema = z.object({
    userName: z.string().regex(usernameSchema.regex, usernameSchema.message),
    password: z.string().regex(passwordSchema.regex, passwordSchema.message),
    name: z.string().min(2, {
        message: "Name must have at least 2 characters."
    }).regex(nameSchema.regex, nameSchema.message)
});

export const todoTableSchema = z.object({
    todoId: z.string(),
    title: z.string(),
    isCompleted: z.boolean(),
});

export type TodoTask = z.infer<typeof todoTableSchema>;

export const createTodoSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    isCompleted: z.boolean()
});

export const usersTableSchema = z.object({
    userId: z.string(),
    userName: z.string(),
    name: z.string(),
    permission: z.string(),
});

export type UserTable = z.infer<typeof usersTableSchema>;

export const todoAdminTableSchema = z.object({
    todoId: z.string(),
    userId: z.string(),
    title: z.string(),
    isCompleted: z.boolean(),
});

export type TodoAdminTask = z.infer<typeof todoAdminTableSchema>;