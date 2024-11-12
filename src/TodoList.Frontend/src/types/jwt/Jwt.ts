export type OriginDecodedJwt = {
    aud: string;
    exp: number;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier' : string;
    iis: string;
    jti: string;
    permission: string;
    typ: string;
}

export type DecodedJwt = {
    permission: string;
};
