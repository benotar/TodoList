export type Login = {
    username: string;
    password: string;
};

export type Register = Login & {
    name: string;
};

