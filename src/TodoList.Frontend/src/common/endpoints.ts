const PORT: number = 5000;
export const BASE_URL: string = `http://localhost:${PORT}/api`;

const SUB_PATHS: { AUTH: string; TODO: string; TOKEN: string } = {
    AUTH: 'auth',
    TODO: 'todo',
    TOKEN: 'token'
};

const ACTIONS: {
    GET: string;
    CREATE: string;
    UPDATE: string;
    DELETE: string;
    LOGIN: string;
    LOGOUT: string;
    REGISTER: string;
    REFRESH: string;
} = {
    GET: 'get',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    REFRESH: 'refresh'
};

const buildUrl = (base: string, subPath: string, action: string, id: string = '') => {
    return `${base}/${subPath}/${action}${id ? `/${id}` : ''}`;
};

export const ENDPOINTS = {
    AUTH: {
        REGISTER: buildUrl(BASE_URL, SUB_PATHS.AUTH, ACTIONS.REGISTER),
        LOGIN: buildUrl(BASE_URL, SUB_PATHS.AUTH, ACTIONS.LOGIN),
        LOGOUT: buildUrl(BASE_URL, SUB_PATHS.AUTH, ACTIONS.LOGOUT)
    },
    REFRESH: buildUrl(BASE_URL, SUB_PATHS.TOKEN, ACTIONS.REFRESH),
    TODO: {
        CREATE: buildUrl(BASE_URL, SUB_PATHS.TODO, ACTIONS.CREATE),
        GET: (todoId: string): string => buildUrl(BASE_URL, SUB_PATHS.TODO, ACTIONS.GET, todoId),
        UPDATE: (todoId: string): string => buildUrl(BASE_URL, SUB_PATHS.TODO, ACTIONS.UPDATE, todoId),
        DELETE: (todoId: string): string => buildUrl(BASE_URL, SUB_PATHS.TODO, ACTIONS.DELETE, todoId)
    }
};
