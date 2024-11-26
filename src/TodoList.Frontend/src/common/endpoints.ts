const PORT: number = 5000;

export const BASE_URL: string = `http://localhost:${PORT}`;

// Helper method to create a full URL for each API endpoint
const buildUrl = (subPath: string, action: string) => {
    return `${BASE_URL}/${subPath}/${action}`;
};

enum SubPaths {
    Admin = 'admin',
    Auth = 'auth',
    Todo = 'todo',
    Token = 'token'
}

enum AdminActions {
    CreateAdmin ='create-admin',
    GetUsers = 'get-users',
    UpdateUser = 'update-users',
    UpdatePermission = 'update-permission',
    DeleteUser = 'delete-user',
    DeleteUsers = 'delete-users',
    GetTodos = 'get-todos',
    DeleteTodos = 'delete-todos'
}

enum AuthActions {
    Register ='register',
    Login = 'login',
    Logout = 'logoutg'
}
enum TodoActions  {
    GetById = 'get-by-id',
    GetTodos = 'get-todos',
    Create = 'create',
    Update = 'update',
    Delete = 'delete',
    Toggle = 'toggle'
}

enum TokenActions  {
    Refresh = 'refresh'
}

export const ENDPOINTS = {
    ADMIN: {
        CREATE_ADMIN: buildUrl(SubPaths.Admin, AdminActions.CreateAdmin),
        GET_USERS: buildUrl(SubPaths.Admin, AdminActions.GetUsers),
        UPDATE_USER: buildUrl(SubPaths.Admin, AdminActions.UpdateUser),
        UPDATE_PERMISSION: buildUrl(SubPaths.Admin, AdminActions.UpdatePermission),
        DELETE_USER: buildUrl(SubPaths.Admin, AdminActions.DeleteUser),
        DELETE_USERS: buildUrl(SubPaths.Admin, AdminActions.DeleteUsers),
        GET_TODOS: buildUrl(SubPaths.Admin, AdminActions.GetTodos),
        DELETE_TODOS: buildUrl(SubPaths.Admin, AdminActions.DeleteTodos),
    },
    AUTH: {
        REGISTER: buildUrl(SubPaths.Auth, AuthActions.Register),
        LOGIN: buildUrl(SubPaths.Auth, AuthActions.Login),
        LOGOUT: buildUrl(SubPaths.Auth, AuthActions.Logout)
    },
    TODO: {
        GET_BY_ID : (todoId: string) => `${BASE_URL}/${SubPaths.Todo}/${TodoActions.GetById}?todoId=${todoId}`,
        GET_TODOS: buildUrl(SubPaths.Todo, TodoActions.GetTodos),
        CREATE: buildUrl(SubPaths.Todo, TodoActions.Create),
        UPDATE: buildUrl(SubPaths.Todo, TodoActions.Update),
        DELETE: buildUrl(SubPaths.Todo, TodoActions.Delete),
        TOGGLE: buildUrl(SubPaths.Todo, TodoActions.Toggle),
    },
    TOKEN: buildUrl(SubPaths.Token, TokenActions.Refresh)
};
