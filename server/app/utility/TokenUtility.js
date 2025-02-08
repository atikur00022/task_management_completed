import {JWT_EXPIRE_TIME, JWT_KEY} from "../config/config.js";
import jwt from "jsonwebtoken";

// Token Encode
export const TokenEncode = (email, userId) => {

    const KEY = JWT_KEY;
    const EXPIRE = { expiresIn: JWT_EXPIRE_TIME };
    const PAYLOAD = { email: email, userId: userId };
    return jwt.sign(PAYLOAD, KEY, EXPIRE);

}

// Token Decode
export const TokenDecode = (token) => {

    try {
        return jwt.verify(token, JWT_KEY);
    }catch (err) {
        return null;
    }

}