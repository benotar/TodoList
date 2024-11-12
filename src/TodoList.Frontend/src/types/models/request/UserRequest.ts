type BaseType = {
    userName: string;
    password: string;
}

export type Login = BaseType & {
    fingerprint: string
};

export type Register = BaseType & {
    name: string;
};