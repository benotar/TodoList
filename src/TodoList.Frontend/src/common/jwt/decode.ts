import {DecodedJwt, OriginDecodedJwt} from "@/types/jwt/Jwt.ts";
import {jwtDecode} from "jwt-decode";


export function decodeJwt(token: string): DecodedJwt | null {
    try {
        const decodedObject: OriginDecodedJwt = jwtDecode<OriginDecodedJwt>(token);
        return {permission: decodedObject.permission};
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
}