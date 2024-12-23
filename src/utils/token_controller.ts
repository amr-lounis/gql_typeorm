import jwt from "jsonwebtoken";
import { localConfig } from "./";

export type jwtType = {
    id: string,
    role: string
}
class token_controller {
    constructor() { }

    Token_generate(id, role) {
        const payload: jwtType = { id: id, role: role };
        const token = jwt.sign(payload, localConfig.JWT_Secret, { expiresIn: localConfig.JWT_ExpiresDay });
        return token;
    }

    Token_Verifay(_token) {
        try {
            const tv = jwt.verify(_token, localConfig.JWT_Secret);
            return tv;
        } catch (error) {
            return { id: null, role: null }
        }
    }
}

export const MyToken = new token_controller();